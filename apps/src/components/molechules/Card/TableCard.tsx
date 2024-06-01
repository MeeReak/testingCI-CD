import { Button, ButtonIcon, Typography } from "@/components/atoms";
import Image from "next/image";
import React from "react";

const TableCard = () => {
  return (
    <div className=" w-[1050px] h-[116.67px] bg-white border-[0.5px] flex justify-between items-center px-9">
      <div className="flex items-center gap-9">
        <div className="rounded-full">
          <Image
            src={`/assets/image/leap.svg`}
            alt={"profile picture"}
            width={80}
            height={80}
            className="rounded-full"
          ></Image>
        </div>
        <Typography>Peng Maleap</Typography>
      </div>
      <div className="flex">
        <Typography>Feb 08, 2024</Typography>
      </div>
      <div>
        <Typography>pengmaleap@gmail.com</Typography>
      </div>
      <div className="flex items-center">
        <div>
          <Button className="flex items-center hover:[#BDD8FF] w-[62px] h-[45px] rounded-[12px] text-center justify-center bg-[#E8E8E8] !text-[16px]">
            View
          </Button>
        </div>
        <ButtonIcon
                  icon={
            <svg
              width="23"
              height="25"
              viewBox="0 0 23 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.76914 4.14044H13.8861C13.8861 3.46189 13.6165 2.81113 13.1367 2.33132C12.6569 1.85152 12.0062 1.58196 11.3276 1.58196C10.6491 1.58196 9.99831 1.85152 9.5185 2.33132C9.0387 2.81113 8.76914 3.46189 8.76914 4.14044ZM7.23406 4.14044C7.23406 3.05476 7.66534 2.01355 8.43303 1.24585C9.20073 0.47816 10.2419 0.046875 11.3276 0.046875C12.4133 0.046875 13.4545 0.47816 14.2222 1.24585C14.9899 2.01355 15.4212 3.05476 15.4212 4.14044H21.8174C22.021 4.14044 22.2162 4.22131 22.3601 4.36525C22.5041 4.50919 22.5849 4.70442 22.5849 4.90799C22.5849 5.11155 22.5041 5.30678 22.3601 5.45072C22.2162 5.59466 22.021 5.67553 21.8174 5.67553H20.4767L19.2313 20.6201C19.1407 21.7073 18.6448 22.7207 17.842 23.4594C17.0392 24.1981 15.9882 24.6082 14.8972 24.6083H7.75803C6.66709 24.6082 5.61601 24.1981 4.81323 23.4594C4.01044 22.7207 3.51458 21.7073 3.42397 20.6201L2.1785 5.67553H0.837856C0.634291 5.67553 0.439063 5.59466 0.295121 5.45072C0.151178 5.30678 0.0703125 5.11155 0.0703125 4.90799C0.0703125 4.70442 0.151178 4.50919 0.295121 4.36525C0.439063 4.22131 0.634291 4.14044 0.837856 4.14044H7.23406ZM4.95394 20.4922C5.01247 21.1957 5.33323 21.8515 5.85263 22.3296C6.37202 22.8076 7.05211 23.0731 7.75803 23.0732H14.8972C15.6031 23.0731 16.2832 22.8076 16.8026 22.3296C17.322 21.8515 17.6428 21.1957 17.7013 20.4922L18.9376 5.67553H3.7187L4.95394 20.4922ZM9.02499 9.2574C9.22856 9.2574 9.42378 9.33827 9.56773 9.48221C9.71167 9.62615 9.79253 9.82138 9.79253 10.0249V18.7238C9.79253 18.9273 9.71167 19.1226 9.56773 19.2665C9.42378 19.4105 9.22856 19.4913 9.02499 19.4913C8.82143 19.4913 8.6262 19.4105 8.48226 19.2665C8.33831 19.1226 8.25745 18.9273 8.25745 18.7238V10.0249C8.25745 9.82138 8.33831 9.62615 8.48226 9.48221C8.6262 9.33827 8.82143 9.2574 9.02499 9.2574ZM14.3978 10.0249C14.3978 9.82138 14.3169 9.62615 14.173 9.48221C14.029 9.33827 13.8338 9.2574 13.6303 9.2574C13.4267 9.2574 13.2315 9.33827 13.0875 9.48221C12.9436 9.62615 12.8627 9.82138 12.8627 10.0249V18.7238C12.8627 18.9273 12.9436 19.1226 13.0875 19.2665C13.2315 19.4105 13.4267 19.4913 13.6303 19.4913C13.8338 19.4913 14.029 19.4105 14.173 19.2665C14.3169 19.1226 14.3978 18.9273 14.3978 18.7238V10.0249Z"
                fill="black"
              />
            </svg>
          }
        ></ButtonIcon>
      </div>
    </div>
  );
};

export default TableCard;