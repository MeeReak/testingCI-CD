import APIError from "@auth/Errors/api-error";
import { publishDirectMessage } from "@auth/queues/auth.producer";
import { authChannel } from "@auth/server";
import { UserService } from "@auth/services/user.service";
import { StatusCode } from "@auth/utils/consts";
import getConfig from "@auth/utils/createConfig";
import { generateToken } from "@auth/utils/generate";
import { logger } from "@auth/utils/logger";
import axios from "axios";
import { Body, Get, Post, Query, Route, SuccessResponse } from "tsoa";

interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface userData {
  authId: string;
  username?: string;
  email?: string;
  createdAt?: Date | string;
  role: string;
}

@Route("v1/auth")
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // TODO:
  // Save User
  // Generate Verification Token & Save to its DB
  // Publish User Detail to Notification Service
  @SuccessResponse(StatusCode.Created, "Created")
  @Post("/signup")
  async SignUpWithEmail(@Body() requestBody: SignUpRequestBody): Promise<any> {
    try {
      const { username, email, password, role } = requestBody;
      const user = await this.userService.create({
        username,
        email,
        password,
        role,
      });
      const token = await this.userService.saveVerifyToken({ id: user.id });

      const messageDetails = {
        username: user.username,
        receiverEmail: user.email,
        verifyLink: `${token.token}`,
        template: "verifyEmail",
      };

      await publishDirectMessage(
        authChannel,
        "smackchet-email-notification",
        "auth-email",
        JSON.stringify(messageDetails),
        "Verify email message has been sent to notification service"
      );

      return {
        message: "Sign up successfully. Please verify your email.",
        data: user,
      };
    } catch (error: unknown) {
      console.error("Error during signup:", error);
      throw new APIError(
        "An error occurred during signup. Please try again later",
        StatusCode.InternalServerError
      );
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/verify")
  async VerifyEmail(@Query() token: string) {
    try {
      const user = await this.userService.verifyEmail(token);

      const userDetail = await this.userService.findUserByEmail({
        email: user.email!,
      });

      if (!userDetail) {
        logger.error(
          `AuthController VerifyEmail() method error: user not found`
        );
        throw new APIError(
          `Something went wrong`,
          StatusCode.InternalServerError
        );
      }

      let data: userData = {
        authId: userDetail.id,
        email: userDetail.email!,
        username: userDetail.username,
        createdAt: new Date(),
        role: userDetail.role!,
      };

      const respone = await axios.post("http://user:3003/v1/user", data);
      const jwtToken = await generateToken(respone.data.data._id, user.role!);

      return { message: "User verify email successfully", token: jwtToken , status: "success"};

    } catch (error: unknown) {
      console.error("Error during verify", error);
      throw new APIError(
        "An error occurred during verification",
        StatusCode.InternalServerError
      );
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Post("/login")
  async LoginWithEmail(@Body() requestBody: LoginRequestBody): Promise<any> {
    try {
      const { email, password } = requestBody;

      const user = await this.userService.login({ email, password });

      const respone = await axios.get(
        `http://user:3003/v1/user/{userId}?userId=${user.id}`
      );

      const jwtToken = await generateToken(respone.data._id, respone.data.role);

      return { message: "sucess", token: jwtToken };
    } catch (error: unknown) {
      throw new APIError("Invalid email or password", StatusCode.Unauthorized);
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/google")
  // Initiates the Google Login flow
  async GoogleAuth() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      getConfig().googleClientId as string
    }&redirect_uri=${
      getConfig().googleRedirectUri as string
    }&response_type=code&scope=profile email`;
    return url;
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/google/callback")
  // Callback URL for handling the Google Login response
  async GoogleAuthCallback(@Query() code: string) {
    try {
      // Exchange authorization code for access token
      const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: getConfig().googleClientId as string,
        client_secret: getConfig().googleClientSecret as string,
        redirect_uri: getConfig().googleRedirectUri as string,
        code,
        grant_type: "authorization_code",
      });

      const { access_token } = data;

      // Use access_token or id_token to fetch user profile
      const { data: userData } = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const { id, name, email } = userData;

      //find the user in database
      const existedUser = await this.userService.findUserByEmail({ email });

      //if user already have account, just update something
      if (existedUser) {
        await this.userService.updateUser({
          id: existedUser.id,
          data: {
            googleId: id,
            isVerify: true,
          },
        });

        //generate jwtToken
        return await generateToken(existedUser.id, existedUser.username);
      }

      //add user to database if new
      const user = await this.userService.create({
        email: email,
        username: name,
        googleId: id,
        isVerify: true,
        role: "Volunteer",
      });

      //generate jwtToken
      return await generateToken(user.id, user.username);
    } catch (error: unknown) {
      throw new APIError(
        "An error occurred during Google login",
        StatusCode.InternalServerError
      );
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/facebook")
  async FacebookAuth() {
    try {
      const url = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${
        getConfig().facebookAppId
      }&redirect_uri=${getConfig().facebookRedirectUri}`;
      return url;
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/facebook/callback")
  async FacebookAuthCallback(@Query() code: string) {
    try {
      // Exchange authorization code for access token
      const { data } = await axios.get(
        `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${
          getConfig().facebookAppId
        }&client_secret=${
          getConfig().facebookAppSecret
        }&code=${code}&redirect_uri=${getConfig().facebookRedirectUri}`
      );

      const { access_token } = data;

      // Use access_token to fetch user profile
      const { data: profile } = await axios.get(
        `https://graph.facebook.com/v13.0/me?fields=name,picture&access_token=${access_token}`
      );

      //add user to database if new
      const user = await this.userService.create({
        username: profile.name,
        profile: profile.picture.url,
        facebookId: profile.id,
        isVerify: true,
        role: "Volunteer",
      });

      //generate jwtToken
      return await generateToken(user.id, user.username);
    } catch (error: unknown) {
      throw new APIError(
        "An error occurred during Facebook login",
        StatusCode.InternalServerError
      );
    }
  }

  @Post("/forgot-password")
  async ForgotPassword(@Body() requestBody: { email: string }): Promise<any> {
    try {
      const { email } = requestBody;

      const user = await this.userService.findUserByEmail({ email });

      if (!user) {
        throw new APIError("User not found", StatusCode.NotFound);
      }

      const token = await this.userService.saveForgotPasswordToken({
        id: user._id,
      });

      const messageDetails = {
        username: user.username,
        receiverEmail: user.email,
        verifyLink: `${token?.resetPasswordToken}`,
        template: "forgotPassword",
      };

      await publishDirectMessage(
        authChannel,
        "smackchet-email-notification",
        "auth-email",
        JSON.stringify(messageDetails),
        "Reset password message has been sent to notification service"
      );

      return {
        message: "Forgot password token has been sent to your email.",
        data: email,
      };
    } catch (error: unknown) {
      console.error("Error during forgot password", error);
      throw new APIError(
        "An error occurred during forgot password",
        StatusCode.InternalServerError
      );
    }
  }

  @Post("/reset-password/token")
  async VerifyToken(@Query() token: string): Promise<any> {
    try {
      const user = await this.userService.FindUserByResetToken({
        token,
      });

      return {
        message: "Token is valid. Please reset your password",
        data: user,
      };
    } catch (error: unknown) {
      console.error("Error during reset password", error);
      throw new APIError(
        "An error occurred during reset password",
        StatusCode.InternalServerError
      );
    }
  }

  @Post("/reset-password")
  async ResetPassword(
    @Body() requestBody: { password: string; token: string }
  ) {
    try {
      const { password, token } = requestBody;
      const user = await this.userService.resetPassword({ token, password });

      const messageDetails = {
        username: user.username,
        receiverEmail: user.email,
        template: "resetPasswordSuccess"
      };

      await publishDirectMessage(
        authChannel,
        "smackchet-email-notification",
        "auth-email",
        JSON.stringify(messageDetails),
        "Reset password message has been sent to notification service"
      );


      return {
        message: "Password reset successfully",
      };
    } catch (error: unknown) {
      console.log("Error during reset password", error);
      throw new APIError(
        "An error occurred during reset password",
        StatusCode.InternalServerError
      );
    }
  }

  @Get("/logout")
  async Logout() {
    try {
    } catch (error: unknown) {
      throw error;
    }
  }
}
