import * as React from "react";
import Svg, { Path, G, Defs, ClipPath, Rect, Pattern, Use, Image } from "react-native-svg";

export const ClockIcon = (props) => (
    <Svg
        width={60}
        height={60}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M30 17.5V30L36.25 33.75M52.5 30C52.5 42.4265 42.4265 52.5 30 52.5C17.5736 52.5 7.5 42.4265 7.5 30C7.5 17.5736 17.5736 7.5 30 7.5C42.4265 7.5 52.5 17.5736 52.5 30Z"
            stroke="black"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const LocationIcon = (props) => (
    <Svg
        width={60}
        height={60}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M30 52.5C38.75 43.5 47.5 35.441 47.5 25.5C47.5 15.5589 39.665 7.5 30 7.5C20.335 7.5 12.5 15.5589 12.5 25.5C12.5 35.441 21.25 43.5 30 52.5Z"
            stroke="black"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
        <Path
            d="M30 32.5C34.1423 32.5 37.5 29.1423 37.5 25C37.5 20.8579 34.1423 17.5 30 17.5C25.8577 17.5 22.5 20.8579 22.5 25C22.5 29.1423 25.8577 32.5 30 32.5Z"
            stroke="black"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const BellIcon = (props) => (
    <Svg
        width={60}
        height={60}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M39.1148 45.0368C40.1868 49.0378 37.8125 53.1503 33.8115 54.2223C29.8105 55.2943 25.698 52.92 24.6259 48.919M5.14208 29.033C4.16835 25.5375 5.18095 21.7585 7.77195 19.2182M30.3658 14.3519C31.1263 12.9836 31.3768 11.3299 30.9398 9.69839C30.0463 6.36424 26.6193 4.38559 23.285 5.27896C19.9509 6.17236 17.9722 9.59946 18.8656 12.9336C19.3028 14.5651 20.3466 15.872 21.6893 16.6767M50.7975 16.7998C49.893 13.2857 47.1265 10.5192 43.6125 9.61481M43.7265 23.613C42.8343 20.2826 40.452 17.4977 37.1038 15.8709C33.7555 14.2441 29.7158 13.9086 25.873 14.9382C22.0304 15.9679 18.6995 18.2783 16.6133 21.3613C14.5271 24.4442 13.8565 28.0473 14.7488 31.3775C16.2253 36.8878 15.9386 41.2835 15.0062 44.624C13.9435 48.431 13.4122 50.3348 13.5557 50.717C13.72 51.1543 13.8387 51.2743 14.2743 51.443C14.6551 51.5905 16.2545 51.162 19.4533 50.3048L49.116 42.3568C52.3148 41.4995 53.9143 41.071 54.1703 40.753C54.463 40.389 54.506 40.2258 54.4295 39.7648C54.3628 39.362 52.9508 37.9793 50.127 35.2135C47.6493 32.7868 45.203 29.123 43.7265 23.613Z"
            stroke="black"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const HomeIcon = (props) => (
    <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M9.35331 2.83998L3.96331 7.03998C3.06331 7.73998 2.33331 9.22998 2.33331 10.36V17.77C2.33331 20.09 4.22331 21.99 6.54331 21.99H18.1233C20.4433 21.99 22.3333 20.09 22.3333 17.78V10.5C22.3333 9.28998 21.5233 7.73998 20.5333 7.04998L14.3533 2.71998C12.9533 1.73998 10.7033 1.78998 9.35331 2.83998Z"
            stroke="#F18B40"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
        <Path
            d="M12.3333 17.99V14.99"
            stroke="#F18B40"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const ProfileIcon = (props) => (
    <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M12.6667 12C15.4281 12 17.6667 9.76142 17.6667 7C17.6667 4.23858 15.4281 2 12.6667 2C9.90523 2 7.66666 4.23858 7.66666 7C7.66666 9.76142 9.90523 12 12.6667 12Z"
            stroke="#484C52"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
        <Path
            d="M21.2567 22C21.2567 18.13 17.4067 15 12.6667 15C7.92666 15 4.07666 18.13 4.07666 22"
            stroke="#484C52"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const CategoriesIcon = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#clip0_688_3192)">
            <Path
                d="M14 4H20V10H14V4Z"
                stroke="#484C52"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

            />
            <Path
                d="M4 14H10V20H4V14Z"
                stroke="#484C52"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

            />
            <Path
                d="M14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17C20 16.2044 19.6839 15.4413 19.1213 14.8787C18.5587 14.3161 17.7956 14 17 14C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17Z"
                stroke="#484C52"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

                {...props}

            />
            <Path
                d="M4 7C4 7.39397 4.0776 7.78407 4.22836 8.14805C4.37913 8.51203 4.6001 8.84274 4.87868 9.12132C5.15726 9.3999 5.48797 9.62087 5.85195 9.77164C6.21593 9.9224 6.60603 10 7 10C7.39397 10 7.78407 9.9224 8.14805 9.77164C8.51203 9.62087 8.84274 9.3999 9.12132 9.12132C9.3999 8.84274 9.62087 8.51203 9.77164 8.14805C9.9224 7.78407 10 7.39397 10 7C10 6.60603 9.9224 6.21593 9.77164 5.85195C9.62087 5.48797 9.3999 5.15726 9.12132 4.87868C8.84274 4.6001 8.51203 4.37913 8.14805 4.22836C7.78407 4.0776 7.39397 4 7 4C6.60603 4 6.21593 4.0776 5.85195 4.22836C5.48797 4.37913 5.15726 4.6001 4.87868 4.87868C4.6001 5.15726 4.37913 5.48797 4.22836 5.85195C4.0776 6.21593 4 6.60603 4 7Z"
                stroke="#484C52"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

            />
        </G>
        <Defs>
            <ClipPath id="clip0_688_3192">
                <Rect width={24} height={24} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const BagIcon = (props) => (
    <Svg
        width={60}
        height={60}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M50.515 37.4272C49.172 44.1417 48.5005 47.499 46.282 49.6615C45.8717 50.061 45.4282 50.4248 44.956 50.7485C42.4005 52.5 38.9767 52.5 32.129 52.5H27.8717C21.0241 52.5 17.6003 52.5 15.0449 50.7485C14.5726 50.4248 14.129 50.061 13.7189 49.6615C11.5002 47.499 10.8288 44.1417 9.48584 37.4272C7.55784 27.7872 6.59384 22.9672 8.81299 19.5517C9.21479 18.9333 9.68379 18.3612 10.2114 17.8459C13.1253 15 18.0408 15 27.8717 15H32.129C41.96 15 46.8755 15 49.7895 17.8459C50.317 18.3612 50.786 18.9333 51.1877 19.5517C52.4655 21.5182 52.688 23.9503 52.2787 27.5"
            stroke="#1C274C"
            strokeWidth={3.75}
            strokeLinecap="round"
            {...props}

        />
        <Path
            d="M37.5 27.5C38.8807 27.5 40 26.3807 40 25C40 23.6193 38.8807 22.5 37.5 22.5C36.1193 22.5 35 23.6193 35 25C35 26.3807 36.1193 27.5 37.5 27.5Z"
            fill="#1C274C"
            {...props}

        />
        <Path
            d="M22.5 27.5C23.8807 27.5 25 26.3807 25 25C25 23.6193 23.8807 22.5 22.5 22.5C21.1193 22.5 20 23.6193 20 25C20 26.3807 21.1193 27.5 22.5 27.5Z"
            fill="#1C274C"
            {...props}

        />
        <Path
            d="M22.5 15V12.5C22.5 8.35788 25.8577 5 30 5C34.1423 5 37.5 8.35788 37.5 12.5V15"
            stroke="#1C274C"
            strokeWidth={3.75}
            strokeLinecap="round"
            {...props}

        />
    </Svg>
);

export const DownArrowIcon = (props) => (
    <Svg
        width={60}
        height={60}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M17.5 25L30 37.5L42.5 25"
            stroke="black"
            strokeWidth={3.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const SearchIcon = (props) => (
    <Svg
        width={60}
        height={60}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M39.4887 39.5278L52.5 52.5M45 26.25C45 36.6052 36.6052 45 26.25 45C15.8947 45 7.5 36.6052 7.5 26.25C7.5 15.8947 15.8947 7.5 26.25 7.5C36.6052 7.5 45 15.8947 45 26.25Z"
            stroke="black"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const BackIcon = (props) => (
    <Svg
        width={9}
        height={14}
        viewBox="0 0 9 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M7.5 12.8333L1.66667 7L7.5 1.16666"
            stroke="#101010"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const FavoriteIcon = (props) => (
    <Svg
        width={18}
        height={16}
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M9.465 14.6075C9.21 14.6975 8.79 14.6975 8.535 14.6075C6.36 13.865 1.5 10.7675 1.5 5.51751C1.5 3.20001 3.3675 1.32501 5.67 1.32501C7.035 1.32501 8.2425 1.98501 9 3.00501C9.7575 1.98501 10.9725 1.32501 12.33 1.32501C14.6325 1.32501 16.5 3.20001 16.5 5.51751C16.5 10.7675 11.64 13.865 9.465 14.6075Z"
            stroke="#292D32"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const RightArrowICon = (props) => (
    <Svg
        width={9}
        height={16}
        viewBox="0 0 9 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M0.999999 1L8 8L1 15"
            stroke="#101010"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const SignOutIcon = (props) => (
    <Svg
        width={18}
        height={16}
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M13.1667 11.3333L16.5 7.99998M16.5 7.99998L13.1667 4.66665M16.5 7.99998L4.83333 7.99998M9.83333 11.3333V12.1666C9.83333 13.5474 8.71405 14.6666 7.33333 14.6666H4C2.61929 14.6666 1.5 13.5474 1.5 12.1666V3.83331C1.5 2.4526 2.61929 1.33331 4 1.33331H7.33333C8.71405 1.33331 9.83333 2.4526 9.83333 3.83331V4.66665"
            stroke="#F14141"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const SettingIcon = (props) => (
    <Svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M7.60386 2.59776C7.95919 1.13408 10.0408 1.13408 10.3961 2.59776C10.6257 3.54327 11.709 3.99198 12.5398 3.48571C13.8261 2.70199 15.298 4.17392 14.5143 5.46015C14.008 6.29105 14.4567 7.37431 15.4022 7.60386C16.8659 7.95919 16.8659 10.0408 15.4022 10.3961C14.4567 10.6257 14.008 11.709 14.5143 12.5398C15.298 13.8261 13.8261 15.298 12.5398 14.5143C11.709 14.008 10.6257 14.4567 10.3961 15.4022C10.0408 16.8659 7.95919 16.8659 7.60386 15.4022C7.37431 14.4567 6.29105 14.008 5.46016 14.5143C4.17392 15.298 2.70199 13.8261 3.48571 12.5398C3.99198 11.709 3.54327 10.6257 2.59776 10.3961C1.13408 10.0408 1.13408 7.95919 2.59776 7.60386C3.54327 7.37431 3.99198 6.29105 3.48571 5.46015C2.70199 4.17392 4.17392 2.70199 5.46015 3.48571C6.29105 3.99198 7.37431 3.54327 7.60386 2.59776Z"
            stroke="#101010"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
        <Path
            d="M11.5 9C11.5 10.3807 10.3807 11.5 9 11.5C7.61929 11.5 6.5 10.3807 6.5 9C6.5 7.61929 7.61929 6.5 9 6.5C10.3807 6.5 11.5 7.61929 11.5 9Z"
            stroke="#101010"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const MyOrderIcon = (props) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M2.5 8.33332H17.5M5.83333 12.5H6.66667M10 12.5H10.8333M5 15.8333H15C16.3807 15.8333 17.5 14.714 17.5 13.3333V6.66666C17.5 5.28594 16.3807 4.16666 15 4.16666H5C3.61929 4.16666 2.5 5.28594 2.5 6.66666V13.3333C2.5 14.714 3.61929 15.8333 5 15.8333Z"
            stroke="#101010"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const HeplIcon = (props) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M10.8333 13.3333H10V10H9.16667M10 6.66667H10.0083M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
            stroke="#101010"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const ProfileIcon2 = (props) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M13.3334 5.83333C13.3334 7.67428 11.841 9.16667 10.0001 9.16667C8.15913 9.16667 6.66675 7.67428 6.66675 5.83333C6.66675 3.99238 8.15913 2.5 10.0001 2.5C11.841 2.5 13.3334 3.99238 13.3334 5.83333Z"
            stroke="#101010"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
        <Path
            d="M10.0001 11.6667C6.77842 11.6667 4.16675 14.2783 4.16675 17.5H15.8334C15.8334 14.2783 13.2217 11.6667 10.0001 11.6667Z"
            stroke="#101010"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const CameraIcon = (props) => (
    <Svg
        width={16}
        height={14}
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 2C0.895431 2 0 2.89543 0 4V12C0 13.1046 0.895431 14 2 14H14C15.1046 14 16 13.1046 16 12V4C16 2.89543 15.1046 2 14 2H12.4142C12.149 2 11.8946 1.89464 11.7071 1.70711L10.5858 0.585787C10.2107 0.210714 9.70201 0 9.17157 0H6.82843C6.29799 0 5.78929 0.210713 5.41421 0.585786L4.29289 1.70711C4.10536 1.89464 3.851 2 3.58579 2H2ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
            fill="#FE8C00"
            {...props}

        />
    </Svg>
);

export const PhoneIcon = (props) => (
    <Svg
        width={19}
        height={19}
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M6.99805 1L7.01562 1.04004L8.99902 5.99805L8.98242 6.00977L7.32617 7.00293L6.46191 7.52246L6.98828 8.38281L7.05078 8.48535L7.05762 8.49707C7.93405 9.88856 9.11144 11.0659 10.5029 11.9424L10.5166 11.9502L10.6182 12.0127L11.4775 12.5342L11.9951 11.6729L12.999 10.001L13.0293 10.0117L17.998 11.999L18 12.0225V16C18 17.0862 17.1271 17.9888 15.96 17.9971C7.91983 17.4886 1.50931 11.0823 1 2.97949C1.00511 2.47672 1.19966 1.99412 1.54492 1.62793C1.89157 1.26029 2.36432 1.03718 2.86816 1.00391L3.02832 1H6.99805Z"
            fill="#FE8C00"
            stroke="#FFE8CC"
            strokeWidth={2}
            {...props}

        />
    </Svg>
);

export const EmailIcon = (props) => (
    <Svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#clip0_812_1408)">
            <Path
                d="M12.8332 4.39542V9.91667C12.8332 10.363 12.6626 10.7926 12.3564 11.1173C12.0502 11.4421 11.6314 11.6376 11.1858 11.6638L11.0832 11.6667H2.9165C2.47013 11.6667 2.04062 11.4961 1.71585 11.1899C1.39108 10.8837 1.19561 10.4649 1.16942 10.0193L1.1665 9.91667V4.39542L6.67609 8.06867L6.74375 8.10717C6.8235 8.14613 6.91108 8.16638 6.99984 8.16638C7.08859 8.16638 7.17618 8.14613 7.25592 8.10717L7.32359 8.06867L12.8332 4.39542Z"
                fill="#FE8C00"
                {...props}

            />
            <Path
                d="M11.0834 2.33334C11.7134 2.33334 12.2658 2.66584 12.5738 3.16576L7.00002 6.88159L1.42627 3.16576C1.57253 2.92821 1.77348 2.72908 2.01235 2.58498C2.25122 2.44089 2.52109 2.35601 2.79944 2.33743L2.91669 2.33334H11.0834Z"
                fill="#FE8C00"
                {...props}

            />
        </G>
        <Defs>
            <ClipPath id="clip0_812_1408">
                <Rect width={14} height={14} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const AddressIcon = (props) => (
    <Svg
        width={17}
        height={16}
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#clip0_791_1525)">
            <Path
                d="M6.6958 7.34782C6.6958 7.86672 6.90193 8.36437 7.26885 8.73129C7.63577 9.09821 8.13342 9.30434 8.65232 9.30434C9.17122 9.30434 9.66887 9.09821 10.0358 8.73129C10.4027 8.36437 10.6088 7.86672 10.6088 7.34782C10.6088 6.82892 10.4027 6.33127 10.0358 5.96435C9.66887 5.59743 9.17122 5.3913 8.65232 5.3913C8.13342 5.3913 7.63577 5.59743 7.26885 5.96435C6.90193 6.33127 6.6958 6.82892 6.6958 7.34782Z"
                stroke="#FE8C00"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

            />
            <Path
                d="M12.3418 11.0372L9.57463 13.8043C9.33005 14.0487 8.99849 14.1859 8.65278 14.1859C8.30707 14.1859 7.97551 14.0487 7.73093 13.8043L4.9631 11.0372C4.23347 10.3075 3.73658 9.37784 3.53529 8.36577C3.334 7.3537 3.43734 6.30467 3.83224 5.35134C4.22714 4.398 4.89586 3.58317 5.75385 3.00989C6.61184 2.4366 7.62056 2.13062 8.65245 2.13062C9.68434 2.13062 10.6931 2.4366 11.5511 3.00989C12.409 3.58317 13.0778 4.398 13.4727 5.35134C13.8676 6.30467 13.9709 7.3537 13.7696 8.36577C13.5683 9.37784 13.0714 10.3075 12.3418 11.0372Z"
                stroke="#FE8C00"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

            />
        </G>
        <Defs>
            <ClipPath id="clip0_791_1525">
                <Rect
                    width={15.6522}
                    height={15.6522}
                    fill="white"
                    transform="translate(0.826172 0.173889)"
                    {...props}

                />
            </ClipPath>
        </Defs>
    </Svg>
);

export const ThreeDotIcon = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#clip0_782_1043)">
            <Path
                d="M11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12Z"
                stroke="black"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

            />
            <Path
                d="M11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19Z"
                stroke="black"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

            />
            <Path
                d="M11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5Z"
                stroke="black"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}

            />
        </G>
        <Defs>
            <ClipPath id="clip0_782_1043">
                <Rect width={24} height={24} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const CrossIcon = (props) => (
    <Svg
        width={22}
        height={19}
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M2.44775 1L20.8052 18"
            stroke="#464646"
            strokeWidth={2}
            strokeLinecap="round"
            {...props}

        />
        <Path
            d="M20.042 1L1.68458 18"
            stroke="#464646"
            strokeWidth={2}
            strokeLinecap="round"
            {...props}

        />
    </Svg>
);

export const DiscountIcon = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M9.51478 2.91517C10.9469 1.69494 13.0533 1.69494 14.4855 2.91517C15.0992 3.43816 15.8624 3.7543 16.6661 3.81849C18.542 3.96818 20.0321 5.45829 20.1818 7.33412C20.246 8.13786 20.5621 8.90109 21.0851 9.51478C22.3053 10.9469 22.3053 13.0533 21.0851 14.4855C20.5621 15.0992 20.246 15.8624 20.1818 16.6661C20.0321 18.542 18.542 20.0321 16.6661 20.1818C15.8624 20.246 15.0992 20.5621 14.4855 21.0851C13.0533 22.3053 10.9469 22.3053 9.51478 21.0851C8.90109 20.5621 8.13786 20.246 7.33412 20.1818C5.45829 20.0321 3.96818 18.542 3.81849 16.6661C3.7543 15.8624 3.43816 15.0992 2.91517 14.4855C1.69494 13.0533 1.69494 10.9469 2.91517 9.51478C3.43816 8.90109 3.7543 8.13786 3.81849 7.33412C3.96818 5.45829 5.45829 3.96818 7.33412 3.81849C8.13786 3.7543 8.90109 3.43816 9.51478 2.91517ZM16.5304 7.46986C16.2375 7.17697 15.7628 7.17697 15.4699 7.46986L7.46986 15.4699C7.17697 15.7628 7.17697 16.2375 7.46986 16.5304C7.76275 16.8233 8.23751 16.8233 8.53041 16.5304L16.5304 8.53041C16.8233 8.23751 16.8233 7.76275 16.5304 7.46986ZM15.0001 13.7501C14.3098 13.7501 13.7501 14.3098 13.7501 15.0001C13.7501 15.6905 14.3098 16.2501 15.0001 16.2501C15.6905 16.2501 16.2501 15.6905 16.2501 15.0001C16.2501 14.3098 15.6905 13.7501 15.0001 13.7501ZM9.00013 7.75013C8.30978 7.75013 7.75013 8.30978 7.75013 9.00013C7.75013 9.69049 8.30978 10.2501 9.00013 10.2501C9.69049 10.2501 10.2501 9.69049 10.2501 9.00013C10.2501 8.30978 9.69049 7.75013 9.00013 7.75013Z"
            fill="#D93A3A"
            {...props}

        />
    </Svg>
);

export const CheckIcon = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21.6C17.302 21.6 21.6 17.302 21.6 12C21.6 6.69809 17.302 2.40002 12 2.40002C6.69809 2.40002 2.40002 6.69809 2.40002 12C2.40002 17.302 6.69809 21.6 12 21.6ZM16.4486 10.4486C16.9172 9.97992 16.9172 9.22013 16.4486 8.7515C15.9799 8.28287 15.2201 8.28287 14.7515 8.7515L10.8 12.703L9.24855 11.1515C8.77992 10.6829 8.02013 10.6829 7.5515 11.1515C7.08287 11.6201 7.08287 12.3799 7.5515 12.8486L9.9515 15.2486C10.4201 15.7172 11.1799 15.7172 11.6486 15.2486L16.4486 10.4486Z"
            fill="#27AE60"
            {...props}

        />
    </Svg>
);

export const ClroseIcon2 = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21.6C17.302 21.6 21.6 17.302 21.6 12C21.6 6.69809 17.302 2.40002 12 2.40002C6.69809 2.40002 2.40002 6.69809 2.40002 12C2.40002 17.302 6.69809 21.6 12 21.6ZM10.4486 8.7515C9.97992 8.28287 9.22013 8.28287 8.7515 8.7515C8.28287 9.22013 8.28287 9.97992 8.7515 10.4486L10.303 12L8.7515 13.5515C8.28287 14.0201 8.28287 14.7799 8.7515 15.2486C9.22013 15.7172 9.97992 15.7172 10.4486 15.2486L12 13.6971L13.5515 15.2486C14.0201 15.7172 14.7799 15.7172 15.2486 15.2486C15.7172 14.7799 15.7172 14.0201 15.2486 13.5515L13.6971 12L15.2486 10.4486C15.7172 9.97992 15.7172 9.22013 15.2486 8.7515C14.7799 8.28287 14.0201 8.28287 13.5515 8.7515L12 10.303L10.4486 8.7515Z"
            fill="#D93A3A"
            {...props}

        />
    </Svg>
);

export const AddToCartIcon = (props) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M2.5 2.5H4.16667L4.5 4.16667M5.83333 10.8333H14.1667L17.5 4.16667H4.5M5.83333 10.8333L4.5 4.16667M5.83333 10.8333L3.92259 12.7441C3.39762 13.269 3.76942 14.1667 4.51184 14.1667H14.1667M14.1667 14.1667C13.2462 14.1667 12.5 14.9129 12.5 15.8333C12.5 16.7538 13.2462 17.5 14.1667 17.5C15.0871 17.5 15.8333 16.7538 15.8333 15.8333C15.8333 14.9129 15.0871 14.1667 14.1667 14.1667ZM7.5 15.8333C7.5 16.7538 6.75381 17.5 5.83333 17.5C4.91286 17.5 4.16667 16.7538 4.16667 15.8333C4.16667 14.9129 4.91286 14.1667 5.83333 14.1667C6.75381 14.1667 7.5 14.9129 7.5 15.8333Z"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const PlusIcon = (props) => (
    <Svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M7 1V7M7 7V13M7 7H13M7 7L1 7"
            stroke="#101010"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const MinusIcon = (props) => (
    <Svg
        width={14}
        height={2}
        viewBox="0 0 14 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M13 1H1"
            stroke="#101010"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const DeleteIcon = (props) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M15.8333 5.83333L15.1105 15.9521C15.0482 16.8243 14.3225 17.5 13.4481 17.5H6.55178C5.67739 17.5 4.95165 16.8243 4.88935 15.9521L4.16659 5.83333M8.33325 9.16667V14.1667M11.6666 9.16667V14.1667M12.4999 5.83333V3.33333C12.4999 2.8731 12.1268 2.5 11.6666 2.5H8.33325C7.87301 2.5 7.49992 2.8731 7.49992 3.33333V5.83333M3.33325 5.83333H16.6666"
            stroke="#F14141"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const CheckIcon2 = (props) => (
    <Svg
        width={14}
        height={11}
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M1 6L4.33333 9.33333L12.6667 1"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const OfferIcon = (props) => (
    <Svg
        width={26}
        height={24}
        viewBox="0 0 26 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M15.7786 20.01L14.1425 21.53C13.4752 22.15 12.3773 22.15 11.7099 21.53L10.0738 20.01C9.79399 19.75 9.24504 19.54 8.85755 19.54H6.54337C5.59617 19.54 4.82119 18.82 4.82119 17.94V15.79C4.82119 15.43 4.59515 14.92 4.31529 14.66L2.67922 13.14C2.01187 12.52 2.01187 11.5 2.67922 10.88L4.31529 9.36003C4.59515 9.10003 4.82119 8.59003 4.82119 8.23003V6.08003C4.82119 5.20003 5.59617 4.48003 6.54337 4.48003M10.0534 3.98903L11.6895 2.46903C12.3568 1.84903 13.4547 1.84903 14.1221 2.46903L15.7581 3.98903C16.038 4.24903 16.5869 4.45903 16.9744 4.45903H19.2886C20.2358 4.45903 21.0108 5.17903 21.0108 6.05903V8.20903C21.0108 8.56903 21.2368 9.07903 21.5167 9.33903L23.1528 10.859C23.8201 11.479 23.8201 12.499 23.1528 13.119L21.5167 14.639C21.2368 14.899 21.0108 15.409 21.0108 15.769V17.919C21.0108 18.799 20.2358 19.519 19.2886 19.519M9.68743 15L16.1456 9.00003"
            stroke="#FE8C00"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
        <Path
            d="M15.602 14.5H15.6117M10.2202 9.5H10.2288"
            stroke="#FE8C00"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}

        />
    </Svg>
);

export const PaymentCheckBoxIcon = (props) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect
            x={1}
            y={1}
            width={18}
            height={18}
            rx={9}
            stroke="#FE8C00"
            strokeWidth={2}
            {...props}

        />
        <Rect x={5} y={5} width={10} height={10} rx={5} fill="#FE8C00" />
    </Svg>
);

export const CupponIcon = (props) => (
    <Svg
        width={27}
        height={20}
        viewBox="0 0 27 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <Rect width={27} height={20} fill="url(#pattern0_2364_175)" />
        <Defs>
            <Pattern
                id="pattern0_2364_175"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use
                    xlinkHref="#image0_2364_175"
                    transform="matrix(0.00195312 0 0 0.00268555 0 -0.1875)"
                />
            </Pattern>
            <Image
                id="image0_2364_175"
                width={512}
                height={512}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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SHCSmG3+gwZCwCUiBABAtDw4sIePaswAMOD7kl6IzDxwmJhv/oMIAQAQNS+of+8e07gBoKqsolfS1eJKQLwxtvkPIgQAQMQ9KOnqgb17TJ5wODzenxlSWll+o6R/l+Sd+mxwAOOb/3ClleULJf1a0hmmZwEAlwqp/57/mJf9h5tUAJCk0sry5ZKel5QzudngEI7a/AcRAgBgylrU3/YftfA3kol0AE4ysECxeFiQGzly85ekqrKKvep/d8DHpmcBABfZIal4spu/NIUrAMOVVpZ/XdImSRdM+SCIlcOSrhx4L75jlVaWny/pvyTNMTwKADjZ2+p/vO8pT/ibqElfARhuYOHFkv5afJSwk70paYnTN39JqiqreFdSiaQ3TM8CAA70nvr33MXT2fylaV4BGK60svw0SX8n6VuSLtQ0wwUi4pikhyRtHP4RkG4w8O9pg6TbJKUaHgcATOqT9Hv1f5rf45H6eR6xADBcaWX5mZJKJZVJWinJF/FFMJYjkp6Q9JOqsopW08NMR2llebakH0m6QVKa4XEAIFaC6r+/XylpW1VZRcT7UVEJAMOVVpanqr/clS/prBG++KE+PUclfSSpWVKdpG2SfuO2V/zjGbgi8BVJqyQVScpV/7+fGQbHAoDpOKL+n9+f/WqU9Ouqsopj0Vw86gEAAAA4D/fpAQCwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACwEAEAAAALEQAAALAQAQAAAAsRAAAAsBABAAAACxEAAACw0P8HkS79y16aljwAAAAASUVORK5CYII="
            />
        </Defs>
    </Svg>
);

export const NotificationIcon = (props) => (
    <Svg
        width={22}
        height={24}
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.7806 11.4699V9.22123C18.5879 9.24225 18.3921 9.25302 18.1937 9.25302C17.7903 9.25302 17.3974 9.20844 17.02 9.12405V11.4699C17.02 12.6079 17.4402 13.5727 17.8609 14.3202C18.0732 14.6973 18.3058 15.0533 18.5137 15.3657L18.6466 15.5648C18.8081 15.8065 18.9501 16.019 19.0837 16.2347C19.2651 16.5275 19.3675 16.8689 19.3675 17.2306C19.3675 17.6156 19.0508 17.9277 18.6601 17.9277H2.46811C2.07741 17.9277 1.76068 17.6156 1.76068 17.2306C1.76068 16.8689 1.86306 16.5275 2.04448 16.2347C2.17815 16.0189 2.31991 15.8068 2.48158 15.5649L2.61449 15.3657C2.82239 15.0533 3.05503 14.6973 3.26729 14.3202C3.68797 13.5727 4.10825 12.6079 4.10825 11.4699V8.09638C4.10825 4.58306 6.99865 1.73493 10.5641 1.73493C11.5103 1.73493 12.4088 1.93549 13.2185 2.29583C13.42 1.74031 13.7147 1.22844 14.0839 0.778408C13.017 0.279272 11.8237 0 10.5641 0C6.02624 0 2.34757 3.62487 2.34757 8.09638V11.4699C2.34757 12.6114 1.67485 13.6177 1.01945 14.5981C0.855523 14.8434 0.692611 15.087 0.541643 15.3307C0.19576 15.8891 0 16.5421 0 17.2306C0 18.5738 1.10501 19.6627 2.46811 19.6627H6.16239C6.16239 22.0581 8.13309 24 10.5641 24C12.9951 24 14.9658 22.0581 14.9658 19.6627H18.6601C20.0232 19.6627 21.1282 18.5738 21.1282 17.2306C21.1282 16.5421 20.9324 15.8891 20.5866 15.3307C20.4356 15.087 20.2727 14.8434 20.1088 14.5982C19.4534 13.6178 18.7806 12.6114 18.7806 11.4699ZM13.2051 19.6627H7.92308C7.92308 21.0999 9.1055 22.2651 10.5641 22.2651C12.0227 22.2651 13.2051 21.0999 13.2051 19.6627Z"
            fill="white"
            {...props}

        />
    </Svg>
);

export const TotalDIcon = (props) => (
    <Svg
        width={29}
        height={29}
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <Rect width={29} height={29} fill="url(#pattern0_1201_12790)" />
        <Defs>
            <Pattern
                id="pattern0_1201_12790"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_1201_12790" transform="scale(0.00195312)" />
            </Pattern>
            <Image
                id="image0_1201_12790"
                width={512}
                height={512}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJREFUeAHt3QmcZFV1+PFxjyYqJIorLokYJWqiGDcU+8P0O6+bYWbqndcVBaJBjcQlLlFRcfu3ihhXEhUF3DBigIkCM933vO6Z0TGKaHAMLqgoihFckYjBBRWS+Xurupme6eru+2p9y4/Ph8/MdN+qevd7z73n1Kt6961bx38IIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggUF6BSWveNTI9PHbJ08QlbxTTj4rpRWL6BTH9mph+R0x/JJb+j2Tpb1v/+7+3ftb6nW/j214UufRjkdM3RU7/dnymMXbkTPNe5ZXhyBFAAAEEEKiIwNgFjQPE0oaYnipO/0NMfyqmewb5f+T0V2L6JXH6PjGdWr91090qwkk3EEAAAQQQKKbA+I7mncUlR0em/yhOPzPIRJ/zuS8SS04Wm5oc39K8czH1OCoEEEAAAQRKJDC9Z/qW/l1+ZPoBMb02Z2Ie6NmAFY7l2vaxpg1/7CWi5lARQAABBBAYvUBkyRNj07eK6TdXSLSjSO55X/Obvg++L6MX5QgQQAABBBAosICYnrDweX7eZFvs9q3vKKTPbm5p3rbA/BwaAggggAACwxVoJX7T3SV+tx9agFwmWfIPk3bcnYYr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oACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQAFAA1nPh0GQEEEKAAoACgAGAdQAABBGooQAFAAUABUMOJT5cRQAABCgAKAAoA1gEEEECghgIUABQA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j6dGAAEEEEAAgZUExPTcIRcBX4jn0r9a6Xj4OQIIIIAAAggMQWA8Sx4vpr8efBGQ/FQsecmkTd5uCN3iJRBAAAEEEEBgLQGx9C0DLQCcnjZpjT9Z6zj4PQIIIIAAAggMUeBIp/cVp9/sfxGQWGTJE4fYFV4KAQQQQAABBPIIiEue38cC4GuR06fkeX3aIoAAAggggMAIBPw1+GL68R6LgBuiOX21zD/l90fQBV4SAQQQQAABBLoRiDJNui0AItMPTGTNP+3mdXkMAggggAACCIxYQCw5K08R8LvP+HeJS6IRHzYvjwACCCCAAAK9CEQufaSYXrdWERCZ/peYntDLa/FYBBBAAAEEECiQgGT6+lULAJe8ceyCxgEFOmQOBQEEEEAAAQR6FVi/85i7iaVf7lAEnDORpQ/r9fl5PAIIIIAAAggUVMCf3l9SAHxuItNNBT1UDgsBBBBAAAEE+ikgpi526Qv6+Zw8FwIIIIAAAggUXEDmk4MKfogcHgIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCPRZ4P8D2doe12IBxC0AAAAASUVORK5CYII="
            />
        </Defs>
    </Svg>
);

export const PendinDIcon = (props) => (
    <Svg
        width={29}
        height={29}
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <Rect width={29} height={29} fill="url(#pattern0_1201_12799)" />
        <Defs>
            <Pattern
                id="pattern0_1201_12799"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_1201_12799" transform="scale(0.00390625)" />
            </Pattern>
            <Image
                id="image0_1201_12799"
                width={256}
                height={256}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);

export const SlideArrow = (props) => (
    <Svg
        width={16}
        height={14}
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M1.05966 12.1942L5.70251 7.12922L1.05966 1.0513"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="square"
            {...props}

        />
        <Path
            d="M9.41684 12.1942L14.0597 7.12922L9.41684 1.0513"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="square"
            {...props}

        />
    </Svg>
);