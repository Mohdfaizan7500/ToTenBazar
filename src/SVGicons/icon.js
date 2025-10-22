import * as React from "react";
import Svg, { Path, G, Defs, ClipPath, Rect, Pattern, Use, Image ,Circle,Ellipse} from "react-native-svg";

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

export const NotificationCircle = (props) => (
  <Svg
    width={7}
    height={8}
    viewBox="0 0 7 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Ellipse
      cx={3.38051}
      cy={3.59481}
      rx={3.38051}
      ry={3.59481}
      fill="#EB2227"
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

export const MobileIcon = (props) => (
    <Svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <Rect width={32} height={32} rx={10} fill="url(#pattern0_2407_336)" />
        <Defs>
            <Pattern
                id="pattern0_2407_336"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_2407_336" transform="scale(0.00195312)" />
            </Pattern>
            <Image
                id="image0_2407_336"
                width={512}
                height={512}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);

export const CashIcon = (props) => (
    <Svg
        width={26}
        height={26}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <Rect width={26} height={26} rx={10} fill="url(#pattern0_2407_346)" />
        <Defs>
            <Pattern
                id="pattern0_2407_346"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_2407_346" transform="scale(0.00195312)" />
            </Pattern>
            <Image
                id="image0_2407_346"
                width={512}
                height={512}
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJREFUeAHtvQmYXVWZ711gO7RKA8og0PgBiu2IotitYRBlkiSEmQSQUZy4bdvXr+/XrQhyVfraEggBkkpSmQgQyECm2qeGVFUqVakKAZJUBbBbr22TSqUqk0lN8T7ic2F9zz7JSc452WfXHtZea+29fjxPOLWnNfz3u9//b689VVXxHwqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqgAAqggFIFjp0zSfCvsgZfzo0V/EODrMaA0mRDZSiAAmYpgPlXNn9Xm6wmfvoF1LgxYFY2ojUogAJKFQAAAABgwF4YUJpsqAwFUMAsBQAAAAAAAADMykq0BgVQQIkCAAAAAAAAAEqSDZWgAAqYpQAAAAAAAACAWVmJ1qAACihRAAAAAAAAAEBJsqESFEABsxQAAAAAAAAAMCsr0RoUQAElCgAAAAAAAAAoSTZUggIoYJYCAAAAAAAAAGZlJVqDAiigRAEAAAAAAAAAJcmGSlAABcxSAAAAAAAAAMCsrERrUAAFlCgAAAAAAAAAoCTZUAkKoIBZCgAAAAAAAACYlZVoDQqggBIFAAAAAAAAAJQkGypBARQwSwEAAAAAAAAAs7ISrUEBFFCiAAAAAAAAAICSZEMlKIACZikAAAAAAAAAYFZWojUogAJKFAAAAAAAAABQkmyoBAVQwCwFAAAAAAAAAMzKSrQGBVBAiQIAAAAAAAAASpINlaAACpilAAAAAAAAAIBZWYnWoAAKKFEAAAAAAAAAQEmyoRIUQAGzFAAAAAAAAAAwKyvRGhRAASUKAAAAAAAAAChJNlSCAihglgIAAAAAAAAAZmUlWoMCKKBEAQAAAAAAAAAlyYZKUAAFzFIAAAAAAAAAwKysRGtQAAWUKAAAAAAAAACgJNlQCQqggFkKAAAAAAAAAJiVlWgNCqCAEgUAAAAAAAAAlCQbKkEBFDBLAQAAAAAAAACzshKtQQEUUKJA2gEgafOatP5uwT80qBQDScdf0uUrSTJUggIoYKYCAID/2V+lxM98oMCNgaQNOunyzcxKtAoFUECJAgAAAADMRIeZpA066fKVJBkqQQEUMFMBAAAAAAAAADOzE61CARRIVAEAAAAAAACARJMMhaMACpipAAAAAAAAAICZ2YlWoQAKJKoAAAAAAAAAQKJJhsJRAAXMVAAAAAAAAADAzOxEq1AABRJVIM0AcOL8iYk/hoU5RjdHG7QbUzcu8RhM8kmARJMLhaMACpitQJoB4IznAAAbTNbkPl7UMAEAMDvF0ToUQIFKCqQZAL6w6obEk6/J5kPb9I9OXN58Y+IxyAhApezFfBRAgVgKpBUAjp8zSVxYl/zZFyar32RN3gfXr7sdAIiVgdgYBVBAmwJpBYDzViZ/9u+eeZlsPrTNDDi5vFlNLCYxEqAt8VAxCqCAfgXSCAAfXzJRjMmpufkKkzXDZE3eDxM77xZfbbw2lSMB+jMQLUABFNCmQJoAwB32d8/8VZk/IwCYf1DwcCEgjfcDaEs8VIwCKKBfAdMB4ISnJgn3bn/3hj8V1/zLh1mDGgDrAQtuDFzfcZu4ouUG4T4dMCY33vhRAf0ZiBagAApoU0A3AJQbrmnTGDvGnmQM6I53bYmHilEABfQrAADwJsAkDY6y/QEKANCfA2kBClirAAAAAGDS/iadpD4AgLWpl46jgH4FAAAAIEmDo2x/uAAA9OdAWoAC1ioAAAAAmLS/SSepDwBgbeql4yigXwEAAABI0uAo2x8uAAD9OZAWoIC1CgAAAAAm7W/SSeoDAFibeuk4CuhXAAAAAJI0OMr2hwsAQH8OpAUoYK0CAAAAgEn7m3SS+gAA1qZeOo4C+hUAAACAJA2Osv3hAgDQnwNpAQpYqwAAAABg0v4mnaQ+AIC1qZeOo4B+BQAAACBJg6Nsf7gAAPTnQFqAAtYqAAAAAJi0v0knqQ8AYG3qpeMooF8BAAAASNLgKNsfLgAA/TmQFqCAtQoAAAAAJu1v0knqAwBYm3rpOAroVwAAAACSNDjK9ocLAEB/DqQFKGCtAgAAAIBJ+5t0kvoAANamXjqOAvoVAAAAgCQNjrL94QIA0J8DaQEKWKsAAAAAYNL+Jp2kPgCAtamXjqOAfgUAAAAgSYOjbH+4AAD050BagALWKgAAAACYtL9JJ6kPAGBt6qXjKKBfAQAAAEjS4CjbHy4AAP05kBaggLUKAAAAACbtb9JJ6gMAWJt66TgK6FcAAAAAkjQ4yvaHCwBAfw6kBShgrQIAAACASfubdJL6AADWpl46jgL6FQAAAIAkDY6y/eECANCfA2kBClirAAAAAGDS/iadpD4AgLWpl46jgH4FAAAAIEmDo2x/uAAA9OdAWoAC1ioAAAAAmLS/SSepDwBgbeql4yigXwEAAABI0uAo2x8uAAD9OZAWoIC1CgAAAAAm7W/SSeoDAFibeuk4CuhXAAAAAJI0OMr2hwsAQH8OpAUoYK0CAAAAgEn7m3SS+gAA1qZeOo4C+hUAAACAJA2Osv3hAgDQnwNpAQpYqwAAAABg0v4mnaQ+AIC1qZeOo4B+BQAAACBJg6Nsf7gAAPTnQFqAAtYqAAAAAJi0v0knqQ8AYG3qpeMooF8BAAAASNLgKNsfLgAA/TmQFqCAtQoAAAAAJu1v0knqAwBYm3rpOAroVwAAAACSNDjK9ocLAEB/DqQFKGCtAgAAAIBJ+5t0kvoAANamXjqOAvoVAAAAgCQNjrL94QIA0J8DaQEKWKsAAAAAYNL+Jp2kPgCAtamXjqOAfgUAAAAgSYOjbH+4AAD050BagALWKmACAFxef534dtM94r7WfxQPt/1YPNp+X/7fv679Z/Evrf8gbl99p/ha/dVCR7LEwPwNDH3i6aMjpovrtDbx0XEUQIGqKh0AcPK8W8XNy/4/Mat5qvjtpoVisNsZ9d++7lrR9cpTYl7HQ+JbzfeI83PjlAABBhfP4NDPX79iM9bxNzkQBVDAYgVUAsA5z3xLPNH0qNi2afmohj8aFPxu0/PisfafiCvqr00UBDAwfwNDn3j66DD94jotTn10HQVQQAUAfGzBXWJOy+Nib3dtbOMvB4P+rmXiyXUPiIvrJiQCAhhcPINDP3/9is1Yx99kQBRAAYsVSBIAjp87Sfyj86Dok3DGX2785dO/2bhQ3Nv8bekQgIH5Gxj6xNNHh+kX12lx6qPrKIACSQHAZ5/5lmjsmCv9jL/c+IunB7prxVMd/youzF0lDQQwuHgGh37++hWbsY6/yYAogAIWKyAbAE6Ye4u4v+4hsWvzSqXmXwwCTRumia/WyXlqAAPzNzD0iaePDtMvrtPi1EfXUQAFZALABc/fK1588Wltxl8MAS++PEdcWn9N7JEADC6ewaGfv37FZqzjbzIgCqCAxQrIAAD3sb6f1v2r2NO1ygjzL4DAxpfnC/cdA3ESKwbmb2DoE0+fOLEpY1uLUx9dRwEUiAsAlzz/fbFxQ7Bn+QvGrPI3LgRgcPEMDv389ZNh4nHKIAOiAApYrEBUADh53jfE/2r4N7Gva/SX+Kg0fK+64kAABuZvYOgTT5845i1jW4tTH11HARSIAgATlvx38euXFxk13O9l/MXzokIABhfP4NDPXz8ZJh6nDDIgCqCAxQqEAYDT598mpjdPEe7jdsXmmpa/o0AABuZvYOgTT5845i1jW4tTH11HARQICgDXvfD/it++sjiVxl8MKGEhAIOLZ3Do56+fDBOPUwYZEAVQwGIFRgOAjy64UyxsnZ56448KARiYv4GhTzx94pi3jG0tTn10HQVQwA8Abln2z+KNjcsyZf4FEAg6EoDBxTM49PPXT4aJxymDDIgCKGCxAl4A8Kmn7xGr2msyafwFAHB/g0AABuZvYOgTT5845i1jW4tTH11HARQoBoDj5twsvrfyfiUf7yk2Yp1/jwYBGFw8g0M/f/1kmHicMsiAKIACFitQAIBznvmWaFg3J/Nn/V6w4QcBGJi/gaFPPH3imLeMbS1OfXQdBVDgg3NvEf+S+7nYqfHjPV6mrHpeJQjA4OIZHPr56yfDxOOUQQZEARSwVIF9r608p339U1ae9XsBhhcEYGD+BoY+8fSJY94ytrU09dFtFLBXAbFx4zsHu51/Hux23vQyQpvnlUMABhfP4NDPXz8ZJh6nDHuzID1HAQsVGO5yxgxucf7dZpMfre/FEICB+RsY+sTTJ455y9jWwhRIl1HAPgX6N9a+d7Db+eVgt/N/RzNAlh9+RBCDi2dw6OevnwwTj1OGfZmQHqOAZQoMbF71lcFu539j7OG+XOiOBHzzxe8KTMzfxNAnuj5xzFvGtpalQrqLAvYoMNC1/LjBbmfmYLfzNuYfzvwLer26+RkgYH10gwMO/LWTYeJxyrAnG9JTFLBIgeHu3PjBbqe3YGT8RgMAVzcgwN/EMPno+sQxbxnbWpQS6SoKZF+B/a+tPHmgu3YBhh/d8L20AwKimxyAUFk7GSYep4zsZ0R6iAKWKDDY5dw42O3s8TIw5sUHAiCgspFh8tG0iWPeMra1JDXSTRTIrgJ7Nq88dWiLswKTj2/yo2kIBEQzOgDBWzcZJh6njOxmRXqGAhlXQAhx1GCX8+3Bbmd4NONiuTw4AAK8zQyTD69LHPOWsW3GUyTdQ4FsKjD4Wt1HBrudNRi7PGMPoyUQEN7sAIQjNZNh4nHKyGZ2pFcokFEFRGvrXwxsqf3BYLezP4xhsa58UAACjjQ0TD6cJnHMW8a2GU2TdAsFsqfAvldznxnszr2Mmcs386iaAgHhDA9AKNVLhonHKSN7WZIeoUDGFODjPeYYvhcoAAGlpobJB9cjjnnL2DZjqZLuoEC2FBjeXPvlgW7n117GwzxzwAAICG56AMJhrWSYeJwyspUt6Q0KZESB3vWL/5KP95hj8EFgCwg4bGyYfDAt4pi3jG0zki7pBgpkR4GBV3MXDXY7vw1iOqxjFiQAAcGMD0A4oJMME49TRnayJj1BgZQrsG9j07F8vMcsQ48CWEAAEBAUcOKYt4xtU54yaT4KZEOBoS5nHB/vSb/5F4ABCAACgkCADBOPU0Y2sie9QIGUKjCypfEkPt6THeMvAID7CwQAAaNBQBzzlrFtStMmzUaB9Ctw8OM9u4tNg7+zBQNAABDgBwEyTDxOGenPovQABVKmwB83Npwy2J1bjtlny+wr7U8gAAioBAFxzFvGtilLnTQXBdKrQNHHe4YqmQXzswkFQAAQ4AUBMkw8ThnpzaaWtHx4WpVI8t9+p0qY/C8ru3nwVeeswW6nGYPPpsEH2a9AABBQDgFxzFvGtlnJr5ntR5Lm75Ztsvm7bUv7jhXiwaMPfrKXj/d022v+BUAAAoCAYgiQYeJxykh7fs18+wGA9O7ifVucTw92Oy8Vkj+/AIAbA0AAEFCAgDjmLWPb9GZXS1oOAKRvRxd9vOdPmD6m7xUDQAAQ4EKADBOPU0b6sqtlLQYA0rXDB7rrzh3srt3slfSZBwwUxwAQAATEMW8Z26Yru1rYWgAgHTudj/dg7sXmHvRvIMBuCJBh4nHKSEd2tbiVAID5O3/fFufCwe7a3wRN+qwHLBTHABBgLwTEMW8Z25qfXS1vIQBgbgC4H+8Z6K6dOtjtvFWc0Pkbgw8bA0CAnRAgw8TjlGFudqVleQUAADMDYairduxgd25b2ETP+sBBpRgAAuyDgDjmLWNbM7MrrTqkAABwSAoj/hh81Tn+4Cd7RaVEznxMPmoMAAF2QYAME49ThhFJlUZUVgAAqKyN6iV8vAdjj2rsYbYDAuyBgDjmLWNb1TmU+kIqAACEFCyB1Q98vMd5IUwSZ11gIU4MAAF2QIAME49TRgLpkiJlKgAAyFQzXFnux3sGttTePtjt7I2TzNkWGIgSA0BA9iEgjnnL2DZcRmRt5QoAAMolz1c4uGXVmYNbnKYoiZttMHxZMQAEZBsCZJh4nDL0ZFdqDawAABBYKikrFn28Z0RWEqccgCBODAAB2YWAOOYtY1spSZNCklMAAEhO2/KS93av+tRgt7MhTrJmW8w+iRgAArIJATJMPE4Z5TmQacMUAACS3yF8vAfTTsK0ZZcJBGQPAuKYt4xtZceohvL+PNjt7Bvsdv5rsNvZNNjlLBzqdh4Y3JK7fmRL40nJu0fCNQAAyQo80JX7XD5w+FY97zVIQQwAAdmCABkmHqcMDYatMs+8PdjtvDbUnXtkcHPuvGSdJKHSAYBkhOXjPZz1pzX5AQHZgYA45i1j27QeA1HaPdDt/Hpwi/NPe36z8phkXCWBUgEA+aLu6151AR/vAQCiJBFTtgECsgEBMkw8ThmmxLPiduwb6Kp90H2rq3x3kVwiACBP0L0b6v6Kj/dg/IqTTWJDnkBA+iEgjnnL2DYrx0LEfuwd2FL7A/fJL3kuI7kkAECOoEOv1l05uMXpiRgoiSVx2gOQxIkBICDdECDDxOOUESf2srLtQLfTMfha3UfkOI3kUgCAeILy8R4MNiuJqlI/gID0QkAc85axbaWYsnD+8NAWZ1I8t0lgawAguqj7ttReNdTt9FkYzIxYpOCOfplxCQSkEwJkmHicMmTGYBbKcp8YMOqSgO0AMPiqc1bYf/u2OJ8e2uKsyEJA0gdGMILGQNfmBeKu9d8Rk9an0wxtbHcc85axbdDYsmq9LbXPuu+GiX7qKXFL6wHAsjM5qw409q30kRpGAtIFPzJMPE4Z5BvvE4yBbscxAgIAAO8dROCiCzHgHQObNy0Qt6//NiMBKRgJiWPeMrblGPI+hvK6dDkLtV8OAAB8dhBnkNLPIEkI2Yi3DZvmiW+svwcIMBwCZJh4nDI43kc53ruchyUO6IcvCgAYZQcBAUAAMeAZA6s3VYubDTdAG6/7F/c5jnnL2BYAGN1fhrbkbg7v3JK2AABG30EEMRoRA94x8NwrjzAKYDAEyTDxOGVw3HgfN2W6DLo3okuy9HDFAACBdpDnGVDZTmQdzpSti4GB7lrx0Es/BgIMhYA45i1jW3JkMH8Z6nbahRBHhXNvCWsDAMF2EIGMTsSAdwz0dr0gvvPivUCAgRAgw8TjlMEx433MeOky0OXcIcHSwxUBAATfQV47jXnoRww44qVNc7kfAAAQ5bDAsREmP9buGuhaflw4B4+5NgAQZgexLgc0MVApBqa9/HNGAQyDgHJDVj1dKVaY751HhrqdB2JaerjNAQDvHUGAogsxEC4G+rqWiW+u/y4QYBAEqDb88vo4hsIdQ4Pdzt49v1l5TDgXj7E2ABB6B1l3oxcHMTESNAZWbJwKAAAAhy4FBI0b1jucYwa6a38Yw9LDbQoAHBaeIEQLYiBeDOzrrhX/fcMPgABDIKD8jFz1NMdT+ONpZ/uC/nAuHmNtACD8DiKo0YwYqBwDDRunAwAAQH4UgOOk8nHipc3AphVia+1ksaPj2bExbD34pgBAuB3ktdOYh4bEwOEY2Nu9Stz74t8DAQZAgOoz/vL6OC4OHxdBtOhvnSPeWPWw6F9T0xrcxWOsCQCE20FBdiLroKntMbDsFe4FKH4lr66/yw1Z9bTtx0GY/u/buCx/9u8CQG/D4/tj2HrwTQEAzCpMkLIu8RIoBrqWioHc+8R+p0qM5I4Su3PvFm/UHSP+vf6DYnPjh8Ta1WeKxc3niOrW88XP2r4uvt9xI+8RSGDEQLXhl9cXKFZ4g2j+xvK+5pn5s38XAN5YNVnsbZt7enAnj7gmAEBC5yAlBpKIgZE1X8kDgAsBQf7tyb1LvNJ4qljcco74t7WXiO903MxlhJhQUG7IqqeTiKsslrn7xeeKzN8FgIfFzvYFP4po68E3AwBI/lk8oOiT/rgefvGBQMZfCQ5GnKr8iMGils+Kn7SPE7esvwsgCAkEqg2/vD6Ow9GPw32bV4ituSlHAEB/y+y64E4ecU0AYPQdRBCjETEQJQZWiP11x8SCgGI42JV7t6hv+pi4v30clwsCgkC5Iaue5rgZ5bjpcsT2puojzN8dAdi+uvr3EW09+GYAwCg7iOtTvPiIGIgcA2EvAxQbvt/f7v0EC1vOFX/fcROjAj4woNrwy+sDAPz9ZcfaeZ7mn78RsPHJoeBOHnFNAMB/BxHA6EMMRI+BoY57pY0AeAHBsHNU/obCH7VPAAQ8QKDckFVPc+xUPnZ2dTxT0fxdANhWN/XNiLYefDMAoPIOInjRhhiIGQMbpycKAMVQsKnxFPFQ2+VcHigCAdWGX14fx4/38bO7c2H+Tn/X6Cv968lNeSu4k0dcEwDw3kEELroQAzJioFbsrztOGQS4QNDdcJK4r308IwLr7z70Tv5yY1Y1zTF05DGUP/OvrWz8h4Cg9hER0daDbwYAHLmDCFo0IQbkxcBI07lKAaAwKtDZeLr4h3U3WA0Cqoy+Uj0cR6XH0c62+RXP+A8Zf2FUAAAI9vxw4YCP8kuAlgYoeqCH7BgYaR2nBQDcfDCYO1o83/w5cdv6O6wEgUrGrGq+7FhKa3kDm1aKvqYZwc1/1cOix+ESQOKJI60BRbsx6rTEwHDHtxI/jkeD//+q/yvxQPtY6yBAldFXqictMZpkO/dsWCR6co+FMn93NKCn7rE/Bx/Lj7gmlwAwkiSDn7KJr6ENP9UOAC4guE8MLGv5tLi9057RgErGrGq+zce/+2W/vpbi1/sGuO5fGP53nwJQ8T0AAIAEbfNBSt+Tj/+hV6YYAQCFUYL/qP+ANfcGqDL6SvXYeHy5w/071s4Vb9RODn3WX3wfQG/TdF4EVDhok/q1MUDpc/Kmh8ZFGm+cYRQAuLnkD7l3islrv5r5SwKVjFnVfJuOg72vvCD6W2piG38BAvqaZjZGHNgPvhkjAEWJije+RX7jm00HOn0Nd8wMbXrKOABwIcD91sDS5s9k+hsDqoy+Uj2ZPla6HLH35aXCvbN/W/3jsc72C6Zf/Lt9Tc1DwZ084poAQLhklumABoAAoCRioGuxkQBQGFVsX31GZp8SqGTMquanPV8OdNeKgc0rxb5Ny8UfXloidq9fKHa2zcvf0d/jHPkBn2IDj/v3jua5n4xo68E3AwAAgLQfpLTf8BjuWmQ0ALggsKX+JHFPxy2ZuySgyugr1RPXBG3dvrf+iT8Gd/EYawIAhifPJM7IKJMzfYUxYOolgMIIQOH3f9cfJ+5dNzFTEFDJmFXNt9XA4/a7r2VmZwxbD74pAAAAcAZNDCQaAwbeBFgw/fJf9yuD3+uYlBkIUGX0leqJa4S2br+9ZfZtwV08xpoAAMk/0eSv8EyTfpgZy6Y9Blhu+uXT7kuDvtOZDQioZMyq5ttq4HH63VM/9U9CiKNi2HrwTQEAM5MmZiZvv+zoWsaQv0YQG9rwgPH3AJRDwH/WHSu+3XFz6kcCVBl9pXriGKGt2/a31CwJ7uAx1wQA5BkNpm2elm9sXCS+vGCMmN78YyBAEwQMd9yTOgBwgeC1hhNS/9bASsasar6tJh6131udR9/e9drCk2PaevDNAQDzTAuQkLdPrl48Xnx+7nniC/O+CARoAoCRtWNTCQAuBKxdfaa4ef3dqR0JUGX0leqJaoS2btfXPKMtuHtLWBMAkGc2GLdZWj70wv/Im78LAECAvn2j63PA5cP6UacXtpwLAOTGikom7zffViOP0u8e59G3+hrnni7B1oMXAQDoS4wAQ3Lab+p8Svz1Ax8rAQAgIDm9K8Zy1wqxf8UxqR0BcKHBfWPgI63pfG2wnzmrWBbFCG3dZte6Z/YMdjkLh7qdBwa35K4f2dJ4UnAnj7gmAKAhKWoaiq2YpDPWnoGuWnHOr74sTvvxGUcAABCgNt6HWv9JjDxflWoAcCFgb+6d4gfrrk/dSIAKk/erw1YzD9vv3sYnve5Renuw23ltqDv3yODm3HkRLd5/MwBAbUK0xYR19vPOeXfkzb8SAAAB6mJ+eNmXxMjT6QcAFwJerz9BfKPzzlRBgJ85q1gW1ghtXH+rM1ns3fiCFwCUzBvodn49uMX5pz2/WXmMv6uHWAoAqEuGOk3RlrqfbnhYnHbfWaMCABCgJu5H5h8vhudlAwBcCFjcfA4AEOJ+ABsNPWyfd69/rsToA+TqfQNdtQ8OvuocH8LqvVcFANQkwgA7NWwQsH7ZpYt/37BQfPjBTx0yf78RABcAgICEY3/TIjFSfZQYnpMdABjJHSUeaB+bGghQcZbvV0dYM7Rt/f61c+Lk8b0DW2p/IMSDR3u7e4C5AEDCSbDMpACBZPTeu7lWfOpXY0rMPwgAAAHJ7A83zofrrhH5/DIzOwDgjgL8rv641FwK8DNnFctsM/Qw/e1rniHcrw3G9YSBbqdj8LW6jwSw+yNXAQCSS4BxdyzbB98342Zcf4T5BwUAICC4zmFiMj/8P61KDGcMAFwIeKblC6kYBVBh8n51hDFEm9bd3lQt3JuVwxxPo6w7PLTFmXSkw48yBwBIJvmNsrNk7njry/rFsn8Rp913ZiwAAALkHgdDG2YdOPt3AaA6WyMALgDsy71DfL/jRuMhwM+cVSyzydSD9jUB8z/kAe4TA6EuCQAAchMfxq9Wz2XNU8Rp93/U0/zDjAC4AAAEyNt3w8u+mGkAcCGgc/WHAYBRbggMaoq2rNe/pkb2mf8h8z/kPVtqnxUbN75zlHP/A4sBAHlJ79AO4Lr/kUGZgCYvdz4lTn/wExXNPwoAAAESjofNi8XwzKMPA8CM7I0AuADg/jP9hkAVZ/l+ddhi7KP1033Ub/f6hUryoutDA92OEwgCAAAJCS8BcwMm/PfLf70YLhsrAAAgAElEQVS8WJz1i8/5mn9UAAAC/LUfLTaHV3zlsPlPqxIjGbwHoAAAXQ0nGz0K4GfOKpaNZow2LHdf8hPkOf/RjqvQy7uchaNeDgAA4iW70DsFWIhNwbs2r/S84981/PJ/haH9KL98QCjCsbF5iRie+Y5SAKjJ7giACwI/a/u6sRCgwuT96rDB4Cv1cavzqNjV/rQY7IpwHMnyiS7nYd9LAQCAxp0jaydbVs6FU684wujLjb8wfcD4v+j5SuBAUDDvPDGz5SexocUWUBxa/uUS83fzy8jcbAPAlvqTAIAK9wJUMscsz3eNf0fbXDGwaaUReWNoS+7mihAAAAAAaTKnsdXXBDZ/FwI+P/+L4kurrhDnPTsmMgQwEhDsGBl6cZoYdl/84975X/xvQbYBwB0FuK99vJEQ4Hd2rmJZlo2+vG899VPFznULxGDXKiOMvyivDw6+6pzlCQElB2rxQSvp78K1MlN/i0QybafRnrKRjVtqJoUyfxcA/m7pJQc+Y+qMjQUBn593npjFSIBvTA4vOKnU+A/mkJGF2QeANavPAgA8RgHKTTJr0z11j4kdrXPEH15a4nts6PaZoW6nXQhx1BEQAAAEO7vRvQNtr/+bRR/4KQzvj/Z78i/OLfmG+ZecK2NBACMBlY+V4YabPc3fzS8jS7MPAEPO0eJ7HRONgwAVZ/l+daTd8LfWPiJ6co+KbXVTRW/DE6KveabY2faU2LPheTGwaYXRpl/uGQNdzh0AwMHHdwojEuUiMV05yevS5u8X3CNOu+/IG/z8AODU+88Wx826vgQA3EQFBCSwf1+aLoZnFD32VzZ6uH9l9gHAzSfPN38OACgbBdCVM6jX6ziv3TXQtfy4EghgBMBLKOaZcgB9Z96doYf9XVj44ONfF8fOmXQEAAABkmN783IxPO+Yimf/w7PsMH8XALbVv0/c3HmXURDgd3auYpkpeYR2HDjuh7qdBwCAolEAAkOyIZRdt4+j7x2zbwlv/j8+Q5z0b1/Km38lAAAC5O3z4UV/U9n83eH/+fYAgAsB97ePAwCKRgHiHP9sK+84LdJy757frDzmEAQwApCIyKm6NlQUHEa0e19Xrbhueri7/QuXA0558JPiuNk3jQoAQED8uB9yrvQ1fze37F9kFwA4TZ8AAAAAI/Jopbw+0F37QwDg4ChAJZGYH98gomi4e9MKccljl0c68z/1Jx8Rx8+45pD5+40AFIY/uScg2n4earxVDE8ve9yv7Np/HgBW2QUAO3LvEbeuv9MYCCjEua7fKDmAbaIdk0F129m+oB8AAACMo9StLz8vPv/LL0cy/wPX/S8vMf8gAJBPjBIeEaxuvs84PYMmhLDrDa2+c9Qz//zI4hy7zL9wY/GD7VcCAAdHAcLGFusna/7ukwtbayeLHR3Pjs1DAJcAkhWcgA6m76Z1c8THfnZONPP/8RnixMnnH2H+gQFAwtMB7nsCflr395mHgKHVtwc683fzyohlw/8FAFjU8lkAAAAwMhf0t84R7qOZ/WtqWgEAp8rInWQbNKxqfET8Pw98LLL5f+jnnxXHzp4YCwDckYC4lwPcVwvfu/K2zMbUcO1lwc783UsB06vE/lo7RwBeazgRAAAAjMsD+zYuy5/9uwDQ2/D4fgAAANAepA8+931x2n1nRTb/Ux78hDiu5gZP8w8zAnDoGmncywFzzxM3L7te7O5K10tCfKFz8woxvPiTwc3fPft/2k7zd0cBhp2jxDc7bzUCAg7FddGNeSrn+caVxCeGqGf0kVb3JUaHX8w0Wextm3t6FZcARheO4JKv0a5Ny8XV066KbPzuXf+n/uSj4vgZ11Y0/0gAIGkk4IJnLhRrO6u1A1bs2H15hv9z/h43/rk5Zf9yewHAhYBfrf0aAJAbm/74zwik7H7xuSLzfzj/9872BT8CADKyg2MneoU6bFo3V3zyF+fGMv/TfnKW+MD08b7mHxUAZF0OcF8d/LO6f0htEszf6e/zhr+KJw+WPftfuPZf/Lu05TMAAABgxLG/b/MKsTU35QgA6G+ZXQcAKDS+NJl0Um2tXnGfOP3+j8Yz//vOFB94/IpRzT8OAOSHSSVcDnDvC+h67iNi6MXJRiSDIPt1aP00MbzgQ6GG/IthwPazfxcEXmo8DQAAAPQf812O2N5UfYT5u5cCtq+u/j0AAAAoCdK+V14QVz05Pp7x//jA9wBOmHJxIPOPDQCSLgcMVR+4Kc69jj648Vklegcx+vJ1hjYvEcMrLvD+pG+Fof5i43f/HnnK7qH/wiiA+z6ASevv1v5P5fV+r7rKY4xp+ZdT/TTdsXaep/nnbwRsfHIIAAAAEjekFY2TxUf+56ekmP+Jky8KbP4yACDu5YDx8z9XeibtDqkvP18MvrIgcd39EkPJso3Pi+HlF4rhme8obWtA0z8EAdVVwpYP/xSM3u/3ex2TAADyq7bjfFfHMxXN3wWAbXVT3wQACNBEA/SmWTeJ0+47U5L5ez/r7xp9pX9eZyWR5kW8HPBPT33M01RHph8lhp87Wwyt+2Wi+pcYfXmsvzRNDC/9vO+X/A6ZewAYGHmOs/9iIPhF2+UAQHnMMa3keN/duVC8sWqyLwD05Ka8BQAQkIkGZOEd/XF/iz/wU8nsveZHMvsKj0xFeU/AjPl/7QkAJcY6/1gxtOIiMbj+yUT3RR4GNj4jhnITxPD840dvVwDTP9QPS9/6V2z45X9Xt54PAJBfkz+myzTOn/nXHrjT//Bjfx7TtY8IAKBMPN8zJtYNHcxxjd/d/qRf/p04dnbls3wv4y/MkwkAbllhIaBu3gdHN9oZRe/Ur/lLMbzks2Ko+bti8JWnQ+tdHr9Dm14Qwy3fF8NLvyCG5x0b+C1+h4w9CARUV4mRFZz9lwPA882fAwDImbGP4fJj2m96Z9t837P+EiAAAHgToF8wyVgWFwBO/NWYisP7BZP3+5UNAPnyQlwO2DTn/aMDgHuTYCWjnfVOMbzgRDG85DNiaOVlYqj+FjHc8t/EUPuDYnD9I2Jw3UNiqO1+MbTmH8Vg0zfFcO2VYnjxp8Xw0yeL4dnvScbwy9o6sgTzLzd/d3p109kAAACgBAAGNq0UfU0zgpv/qodFj8MlACU7R4aRprWMOABw4uQLYpm/CwaJAECIkYD/nP3uyuZeMFL3q3oBvqxXERIK5Wj4tfmNf16mXzxvY8MpAAAAkLjH7NmwSPTkHgtl/u5IQE/dY3/mEgABmmiARgKA+84QJzz6ldjmnyQABL0csGPWX4wOABqMWwpMzOPMv9jwy//+bf3xAAD5NbH86n7Zr6+l+PW+Htf5V1Wet839HoCUROCTwMoPCtOm03pmnZZ2hwWAU+87U5ww9VIp5p80AAS5HLBvxlHZBAD3pj9LP/YTNIe9UXcMAAAASAcAd7h/x9q54o1a/7v8S673e4BAb9N0XgSUFiNNazvDAID7bv8PTBsrzfyVAID7xIDPPQFDKR3a9z0xcM1/FWf/o4FAX+69AAAAIA0A9r7yguhvqYlt/AUw6Gua2cgIAAEqLUC9ICUoAJzy04+L46uvlmr+ygDgIAR88bkLhPvq3+J/mQMAzvzFaMZfWL4n9y4AgPwaPb92OWLvy0uFe2f/tvrHQ1/jLxh9pd/ta2oeAgAI0OgBGkC7IADwoZ99Rhw3q/InfV0jj/ovqZsAK5X7xUUXlQCA75m0z6UzI7dzP/LDsH9gABhyjgYAAuQIrxMHW+YNdNeKgc0rxb5Ny8UfXloidq9fKHa2zcvf0d/jHPkBn0pmHmX+jua5nwQACFCtAOA+43/c7ImRDX40MKhk1EnO/9sXvia+MP+LeRAw0sgjgMfIswz5F87sg/4CAGOln7VGMTq2OfJGwN76J/5Y5f6XdIIKerDoWs8W0tTVz0ojAKfed5b44JSvJWb8BTBI0uj9yv7SqivEeQu+JPIfAopguEkfl4HLd1/yw3P+gc/6i/PY3txfWD8CgPkeab4maNLXMrMTAHB4EVDSYOAFAKf89G/E8dUTEjd/FwL8TDrxZc5Y8YenYn5gRyM8jMytEvt5w18k83dBYFfu3QCAx93nJhig7W3Y3jL7NgAAAEh0+N+Fi3IAOPmhL4jjam5UYv7aASA3VvzOea/Yv7RKDM/0edtfweRNeWLAPetfxJB/8dl8lL+31b8PAAAAjLsM0lM/9U9CiKMAAABAHQD85CxxgoIh/8LQf+E38bP8Ch8OKtS7xfmrA2eQtVViZGGVGPZ77a8BAJB/sx+P+EU+6y8GhX+v/yAAAAAYBwD9LTVL8ubv/i/wtcDCWUrI3+IDwsS/kx4Ct718dwTgQ//z0+L4GdcqO+svmL8JIwDrcx8oNZNVVcK9oc4TBPzgIORxF+q4nl4lRhbwQR/Z+enlxlMBAADAKADY6jz69q7XFp4MADgHhjhtN+ik+3/i5AvFsQne5V9s9l5/F87Edf3mnFNKAeBg3I24IwLPV4mRmrJLA8VfBkzS9N2yZ1SJkWeqxP6VDPfLNn+3vDWrzwIAAACjAKCveUbbIfNnBICbAJMGAC9TVjlPl/EX6p3jfMQTAEoMZ9nBUYFZVWIkaQBwr+/PP3hnP8/0j75vDgJbyf4KOG9x8zkAAABgDAD0OI++1dc493QAoOgATtoAbS9fpdl71VUwYl2/D+U+HcpkRty77p+rEsPzDpyhhxrK9xoxcIf3Z1eJ/LX9pbzIJ4qRR92munUMAAAAGAMA/WtqZpaYPyMAjAAkDShepqxyni7jL9T733J/GwoAjjCblVViZGmVGHnuwHB9/ux9zkFTrzlwCSF/GcE1+XlVYuSpA6MJ+927+Jdh+EfoWQT/SS/7edsVAAAAYAQA9NRPHRZCHA0AlCWApA3Q9vJVmr1XXQUj1vV7Xe7ieABQFq9Jmxbly7sf4nsdEwEAAEA7APQ4j7zd3zLz8iPMnxEARgCSBhQvU1Y5T5fxF+odkxsrdjnvBAIsAxkTXgI0af3del+EleNVwCa8cKivdfbDnuYPAAAAAMDYxJPkutwHAQDLAGBz44e0n/0DAGa+hlclFPQ2V79c0fwBAAAAAEgeAGpyAZ4EsMwgs36pYYkBTwAAAHYDwPbGJ3tef/3BdwEAPsk1aQO0vXyVw/1edRWG4nX+/o/c5xkB8DkGswgD/2vtpYwAcAlA2/X/3sYnd+1uXfx+X/NnBIARgKQBxcuUVc7TafyFusflLhEjlhlgFk09aJ/cfX1Pxy0AAACgBQB6G57s3dm44H2jmj8AAAAAAMlfAnBBoLvwTQBAIPOjIf9R/wEjzJ9LAPZdAti+enr364sX+w/7F5NB7BeNeL18pGheUGrWtV7SBmh7+SrP9r3qKpyF6/6dxX0AmTf+Qg5b3KL/DYCu+QMA9gDAgUf9aqYUe3ugvwEAJ/Ev4tkMAV6mrHKebuMv1P8t58vWGGDBCG39faBtLCMAB7+SqfKOd1vr6m14YrBv7YzLAhl++UoAAACQJKCoNHuvugoGrPv3/NyVYgfvA8g8BO2se4+4df2dAAAAkPj1f/fLftubZi0Sixe/o9zXA08DAAAAAKDmPoAlzumZN0Bbz/oL/c41fdwY8+cSQDYvAbjG39tc3bazsebMwEZfaUUAAAAAANQAwLdyXwIAMn4T5IPtVwIAB8/+3VE3W4flk+j31ropb/a1zFo2smXBSZX8PPR8AAAAAADUAID7WuDfOe8FAjIKAb117xO3rL8LAAAApIHP1tyjb25vqt60raXmLiHEUaENfrQNAAAAAABQAwDuGVF17mwAIKMAsLDlXKPMn0sAabgE8IjocR59q6fusT/31j++f/vqaVv7mmet3tk2++c7m+Z9ZjT/jr0cAAAAAAB1AHBt7qti2DkKCMgYBLj79N51+r/+V3j8r/Cr++bXJHNL+squ3TXQtfy42KYtswAAAABI8kDyujNf5TzdCdCr/jrnFAAgYwDQtvoM487+TRgBSDK3pLHsoW7nAZn+HbssAAAASPJAUmn2XnV5GbDueXfkzgcAMgYA960bDwAUXfsvHGNJ5paUlr13z29WHhPbuGUVAAAAAEkeSF6mrHJeIRGZ9tvp8IngwqNzaf/d3GDGp38Lw/7Fv7rjPsncktayB7prfyjLv2OXAwAAAEkeSCrN3qsu3QmwUv0/cL7IKEBGRgFMe/QPADA7p+9sX9Af27hlFQAAmB0sSZqzirK9TFnlvEoGbML8DbnjgYCUQ0BXw8lGDv0XIEB3nKvIMWmqY2DTCrG1drLY0fHsWFkeHqscAAAASPIAUmn2XnXpToB+9X8z92U+E5xiAHA/+3tfu5nX/gEAM/N6f+uc/DsC+tfUtMYyblkbAwBmBkqSpqyybC9TVjnPz4BNWMYTAVWpHQVpbDrb6LN/FwJ0x7jKXGN6Xfs2Lsuf/btvCexteHy/LA+PVQ4AAAAkeeCoNHuvunQnwNHqvy53sRhwjk6tCab9Br6o7d+Te5f4TuckAMDjzv/imE8yt6St7L7mmUVvCJws9rbNPT2WecvYGAAAAJI8kLxMWeW84mRk6t8znY8CACm7FDBjzRjjzZ8RAHNy++4Xnysy/wNvKNzZvuBHMjw8VhkAgDlBkqQR6ypbpdl71WWq6Re366Lc18Wvc+8HAlICAb9uOMG4d/4XrvmX/xbHmY6/deUdk+rdt3mF2JqbcgQA9LfMrotl3jI2BgAAgCQPFi9TVjlPR9KLUufduTG8IjgFAOC+8vdH7RNScfbPCIABub3LEdubqo8wf/c+gO2rq38vw8NjlQEAGBAk3dltg0qz96orihnr2mZ+7kxGAQyHgGfWfD415g8A6M+rO9bO8zT//I2AjU8OxTJvGRsDAPqDJMkzcN1le5myynm6zDxKvV/JfV10OccCAYZCwMaGU1Iz9F+4FBAlDmVuozv/6Kx/V8czFc3fBYBtdVPflOHhscoAAACAJA8SlWbvVZfMZKaiLPepgF3OO4EAwyCgv+4vU3HXf8H4C78qYtavjiRzi8ll7+5cKN5YNdkXAHpyU96KZd4yNgYAAIAkDyQvU1Y5zy85mbrsh855vCDIIAAYyR0lftb29VQN/QMA+vJ6/sy/9sCd/u6ZfsV/tY8IGR4eqwwAQF+gJGm8ppSt0uy96jLV5Edr11znLEYBDIGAtF33L5i/+ztanCW93JQ8pKodO9vmVzb8chgAAPS/BUxVYNhaj5cpq5yXdIJLqvzzc1eK+tyHgADNENC0+qPi5vV3p/LsHwBQd3I3sGml6GuaEdz8Vz0sehwuAWhPcLYas6p+qzR7r7qSMmgV5bo3BW5wPqD9GIn6try0b9fZeLq4df2dqTV/AEANAOzZsEj05B4LZf7uZYGeusf+HGv4XsbGXAJQEySqDNe0erxMWeU8FUadZB2X5i4Xr+aOAQIUjwRsqT9J3NF5e6rNHwBINre7X/brayl+va/P9f7y4X/3KQATvgcAACQbJKYZsur2qDR7r7qSNGdVZV/tfE38znkvEKAIAn5bf7y4u/PW1Js/AJBMbneH+3esnSveqPW/y7/izX8HYaC3aTovAtI9TKjaEG2rz8uUVc5TZdJJ13NV7mviN877gICEIcA1/+92mP+RH9fcg/xLOi5HKz9L+W7vKy+I/paa2MZfAIO+ppmNMkbxY5XBCEAylJilwI/TF5Vm71XXaAkqTcuvzF0qXnO4HJDUScOrDSeKb3Zk48y/AAe64ztO7tC+bZcj9r68VLh39m+rfzz0Nf6C0Vf63b6m5qFY5i1jYwAAAEjyQPMyZZXzdCdA2fV/PXep2JTjbYGyIaBj9YfF7Z13BDqrLphrGn5lx1/Y8pLMLTLKHuiuFQObV4p9m5aLP7y0ROxev1DsbJuXv6O/xznyAz6VzDzK/B3Ncz8pw8NjlQEAAAAyDqRKZag0e6+6wiasNKzvPh2wMncqlwMkXQ5Y3fTR1N/tXwlGdMdzFGO0YZve+if+GMu4ZW0MAAAAlcxbxnwvU1Y5T3cCTKr+Mbmxoto5mzcGxoAA98t+7kt+0vycfyXjL8xPKv6ClmuDmUfpY1/LzE5ZHh6rHAAAAJBh9JXKUGn2XnUFTVRpXe9Hzrlij/MXjAaEBIG+3HvFg+1XZm7Iv2D8hV/dcR3FHG3YZnvL7NtiGbesjQEAAKCSecuY72XKKufpToAq6r8m91XxknM8EBAQAtyv+n2nMzt3+hfM3utXRfz51WGDmYftY0/91D8JIY6S5eGxygEAAAAZRl+pDJVm71WXX3LK0rILcleK6c7Zwh3Wln2DXFbKc7VZ2HJu6j7p62XsQefpjvGw5mjD+v0tNUtimbbMjQEAAKCSecuY72XKKufpToCq6/9O7svid/U8JVAOLa/XnyB+1D4h80P+5WCgOv7K67PB0MP0cavz6Nu7Xlt4skwPj1UWAAAAyDD6SmWoNHuvusoTkg3TX2+6Vsxe83dib+6d1o8G7Mm9K6/FLevvss78XRjQHe9hzNGGdfuaZ7TFMmzZGwMAAEAl85Yx38uUVc7TnQB11D+mbqy4rv128f2OG0Xn6g9bCQEjTpVY3XS2+FbnLVYaf2EkQEf8Fddpg6kH7WOP8+hbfY1zT5ft4bHKAwAAABlGX6kMlWbvVVdxMrLp7682XnPI+O5rHy82NZ5iDQi4fXX7XDBBm391x3xQc7Rhvf41NTNjmXUSGwMAAEAl85Yx38uUVc7TnQB11n91W+lrbX/WdoVwv3JXfn08K9ObGz5kxaN9YYBGZ/y5ddtg7EH62FM/dVgIcXQSHh6rTAAAAJBh9JXKUGn2XnXpToA667+owb3p7chr3+7Z8ZrVZ4kh5+jUw4B7Z3/b6jPEj9uv4ozf4wNBOuMPADjweeAe55G3+1tmXh7LqJPaGAAAACqZt4z5Xqascp7uBKi7/vGtN1c0xu91TBLPt3xWbKtP31cGe+ren3+k7951Eyv2L8yZclbX1R1/Qc6Os75OX+vsh5Py79jlAgAAgAyjr1SGSrP3qkt3AtRd/wX148XEziNHAYoN7+bOu8T97eOE0/QJsSP3HmNHBXbWvUfkmv4mP8zvtrm4D/zt/Xlg3fGXdXMfrX+9zdUvxzbpJAsAAACASuYtY76XKaucpzsBmlD/FS03BjbLW9ffmTfYxS3niNcaTtD6YiH3Tv7/qP+AWNx8jnigbWxmP9iTJLzojr/RDDLLy7c3Ptnz+usPvitJ/45dNgAAAMgw+kplqDR7r7p0J0Az6h8nrlt3e2AIKDakb3beKn619mtiactnxEuNpyU6QrA79+780wpLmz8jfrn2UnFPh92P8BXvh6h/646/LBu8X996G5/ctbt18ftjG3TSBQAAAEAl85Yx38uUVc7TnQBNqf/ixqvFxE7vYeKw5uLeO/CLtstFdesY8VzL54T7OV33/fq/rT9evFF3jOiv+0vhmvlI7sBrif+Qe2d+urfuffkz+lcaTxUtqz8iljSfky/j521XiO91cC0/7H4Isr7u+PMzyawu6214sndn44L3Je3dUsoHAAAAGUZfqQyVZu9Vl+4EaFL949fa8QGcIMZoyzq64y+rJl+pX9tXT+9+ffFis4f9i8khcQBYVWXsTUXu88+VjIv5csDIy5RVztOdAE2q//y68eLGjjsjXQqwxTCz1k/d8VfJKLM2/8CjfjVTir01FX8nDQAjKwAAm2FCpdl71aU7AZpW/2VNNwAAHs/LZ834C/3RHX9ZM3qv/vQ2PDHYt3bGZakw/PJGJg0A+5cDAADAJOFlzirm6U6AptXvfifg2vZvAAGWQIDu+PMyzKzMc7/st71p1iKxePE7yn01NdOJA8BSAAAAAAB0J+Li+i9suGrUdwMUziD5lXPjpC4di/e7jr+zYvbF/XCNv7e5um1nY82ZqTH6Sg1NHACeAwAAAABAR/L1q/PyZi4F6DJllfX6xYCKZcXGmfa/t9ZNebOvZdaykS0LTqrkp6mbnzQAjDwNAAAAAICKZBu2jmvaSz8WpNKYqEvNyELYmJC9ftpNv6fuMbGjdY7Ys2HRb438mE9c4kgcAOYCAAAAACA7scoo78J6LgVkHURkxEmcMkwHgK21j4ie3KNiW91U0dvwhOhrnil2tj0l9mx4XgxsWlHylNhAl3NHXL81bvukAWB4BgAAAAAAcZJokttyKUDNmbgu0EgydoKUna3cV7troGv5ccaZeJwGJQ4A06rE/mXmQkC2AlTOs/syNVFxp79fHUGSlO3rXN3GpQBdBp10vbpjW2YuMaGsoW7ngTh+a9y2KgBgxOAbAU0Iqiy3wc+cVSzTnQDTUL/7xUBeEJTNkQDd8ZfB3LZ3z29WHmOckUdtkBIAMPg+gAwGaMl1K939U2HyfnXoToBpqf9rq6/l3QAZfDeA7vjTnX+SqH+gu/aHUf3WuO1UAMDw9Cqx39BXAicRIJR5+FKEnzmrWKY7Aaap/rFr+CBP0kPyqsvXHX9ZzIU72xf0G2fkURukBACmVYmR5828DyCLAWpSn1SYvF8duhNguuofJ65tv42RgAyNBOiOP5NykYy2uE8GbK2dLHZ0PDs2qucatZ0qABieAwDICMC0leFnziqW6U6Aaav/gvqrxE2dfDBI9Zl6UvXpjr+05avR2tvfOke4jzb2r6lpNcrIozZGGQC4owAGfhhotB3O8sPD+VG0UGHyfnXoToBprP+S1dcxCpCRUQDd8RclZ5i6zb6Ny/Jn/y4A9DY8vj+q5xq1nUoAGF5g3iiAjhdV7Gx/yqgb9ZI84PzMWcUy3QkwrfWPXTMJCMgABOiOvyRzi+qy3ZcEHfaLyWJv29zTjTLzKI1RCgDuzYArzYKAwzv04aKdm/zf/WtqxEBXbeZBQIXJ+9WhOwGmt373fgC+GpjU0LyqcnXHn2qTTqq+3S8+d4Q/7Gxf8KMonmvUNkoBwL0MYNi3AXQBgFtvb+OTYt+mlZmGAD9zVrFMdwJMc/0X1I8TN6y7g4wGjmIAABm2SURBVJGAFI8E6I6/pAxZZbn7Nq8QW3NTjgCA/pbZdUaZeZTGKAeA6WbdC6ATANy6e3KPiT+8vCSzEKDC5P3q0J0A017/Vxom8OlgAEBEjWOVRp1IXV2O2N5UfYT5u7l7++rq30fxXKO2UQ0Abn0jBr0YSDcAHKh/stixdm4mLwn4mbOKZVETF9uNPZT0L226nlGAlEKA7jhOxJS7492YHKZNO9bO8zR/N2/3Nj45ZJSZR2mMDgDIQ8ASM+4FMAMADtxzsK3hcbH35aWZGg1QYfJ+dehOgFmpn5cEpfNVwbrjL4zZmrburo5nKpq/6xvb6qa+GcVzjdpGGwC4Xwk04O2AJgGA2xb3JRPu5ygHurNxg6CfOatYpjsBZqf+cYKPBqUPAnTHn2mmHrQ9uzsXijdWTfYFgJ7clLeMMvMojdEFAPlRgHn6RwFMA4BCe9zvU+9evzD1owEqTN6vDt0JMEv1j6kbJ65bx5sCVd3BL6Me3fEX1HBNWi9/5l8b4Emw2kdEFM81ahudAJCHgIV6IaBguKb+uk8K/OGl9N4k6GfOKpbpToBZq/+CuqvEDR08GSDDnFWUoTv+TDL2IG3Z2Tbf96y/xCcAgCoRGyDcpwJe0AcBJTt0VQDq07SO+xKKva+8kLoRARUm71eH7gSYxfovapjA64JTclOg7vgLYromrDOwaaXoa5oR3PzdJ7gcLgHEB4BpVWK4ukrsX6YHAtICAIV29jZOS9WlAT9zVrFMdwLMav0XN14jJq2/i6cDDAcB3fFngrmP1oY9GxblH8cu5Nigvz11j/3ZqOH8KI2JfQbvGriMfzP0vB8g6M42bT33HoGd654WA5tXGT0qoMLk/erQnQCzXP8lTXwzQMUwfpw6dMffaOarc7n7Zb++luLX+4YbAd6Whe8BSDFvGQDgljGrSowoflWwacYetj1bax/JD13t7nxWDGw2762CfuasYpnuBJj1+q9ouZFRAINHAXTHn06Dr1S3O9zvvnfljVr/u/xHy8W9TdN5EZB0gHAfD1yu7nLAaDs5TctdGNjeXC1cGNi3abkRIwMqTN6vDt0J0Ib6r1xzExBgKATojr9KJqxjvnsPVX9LTWzjL3hCX9PMxiij7kZtI93AZYwGVKu7MbCwM7P425Obkh8dcL8+6D5JoOPjQ37mrGKZ7gRoS/28KMjMdwTojj8dRn+ozi4n/2I1987+bfWPh7rBL4gfbF9T85BRZh6lMUYCgAsR7tMBCh4RDLKjs7KO+5Ih994B993WO1pni13rFog9Lz6fh4O9rywV+zYuz3+cSOalBBUm71eH7gRoU/3jWvmEcJzr9Ulsqzv+DplxQq/vdV+Y5uYrd8TTPclx352ys21e/sSnxznyAz4yc/mO5rmfjOK5Rm1jLAAcHEkYcV8WlOAbA2UGBGUdeRONnzmrWKY7AdpW/7jWm7kcYNDlAN3xl9Wc2Fv/xB+NMvKojTEdANz2jcysEiMJfTsgqwFqSr9UmLxfHboToI31T1h7CxBgCATojj9T8pDsdvS1zOyM6rlGbZcGACi00R0NGFkh9wZB2YFBeaWjAH7mrGKZ7gRoa/1XrWUkIIkh/bBl6o6/rObD7S2zbzPKyKM2pmCuqfl17w14ukrsl/S4YFYD1JR+qTB5vzp0J0Cb6x+/lnsCwhq27PV1x58peUhmO3rqp/5JCHFUVM81arvUGH/50wUuCCyI/8igzMCgrNKzf1cPP3NWsUx3ArS9/nGtE7kcoPFygO74y2JO7G+pWWKUicdpTGoBoAgIRmqqxMhz0W4WzGKAmtQnFSbvV4fuBEj9YwXvCdD3iKDu+DMpF8loy1bn0bd3vbbw5Diea9S2WQCAQ31wRwXmHnx8MOC3BWQEBWUceeZf0MTPnFUs050AqX+scDXgjYF6IEB3/BXyQFZ++5pntBll4HEbc8g8i86oMzPPfaHQ3CoxvODACEH+SYJlB28kPPhoYVYC09R+qDB5vzp0J0DqPwAAQAAAYGqOCtquHufRt/oa554e13ON2j4zZh8RYFTvDLF48bv6mme8GDTo0r6enzmrWIYBHzZgE7S4ZPV1YiJfEVR2X4TufZ72/FXc/v41NTNV+0Xi9QEAiUvsWcH2NTVPuW/mKw6wLP6twuT96tCdAKn/SAC5uPFqcWMHnxKWfce/V3m64y8rOa2nfuqwEOJoz2Se5pkAgL69198y57vusFJWDhKvfviZs4pluhMg9R8JAK4mFzVMEDd23KHsTNjLHG2Ypzv+vHJC2ub1OI+83d8y83J9TpFgzQBAguIGKLqvbe6YbfWP/zFtB0XQ9qoweb86dCdA6vcGAFeXC+quEtetuw0ISPAxQd3xFzRPmLxeX+vshwOk8nSuAgDo329vtM57T3/LrLosXhLwM2cVy3QnQOqvDACuNufXjRPXtN8KBCQEAbrjz2RjD9K23ubql/U7RIItAAASFDdk0f1r5l3XUzf1/wQJzLSso8Lk/erQnQCp3x8ACvrwOeFknhIo6KvrNy15yqud2xuf7Hn99QffFTKNp2t1AMCs/bV3wzN/tb15xvo3VmXjBkE/c1axTFfio95gxl+s0yVN14mJndwcKPPehGJ9dfztZaxpmNfb+OSu3a2L32+WOyTQGgAgAVElFNnfvuCK3sZpvWk4WPzaqMLk/erQkfSoM7z5FzT7SsMEcQM3B0q7JFLQVdevX24wdVlvw5O9OxsXvE9CGje/CADA7H3U1zr3nm31jw+ZerCM1i4/c1axTFfio97oEHBB/Xhxbfs3pJmgzDPqtJWlOw5Hyw+mLd++enr364sXZ3vYv9jyAIBiNcz8233+dHvLrMe21U39k2kHzGjtUWHyfnXoToDUHw0ExtSNFeNa+ZpgXODQHX+j5QdTlh941K9mipkOkGCrAIAExU2g6L41s+9N06UBP3NWsUx3AqT+aABQ0O2SpmvFTZ13MhoQ8SmBgo66fk0xeL929DY8Mdi3dsZlCaRr84sEAMzfR14t3LV23mXbm6tf7XEefdsvuHUvU2HyfnXoSnzUG8/4i/W7oP4qcW077wuIMhpQrKOOv3XnH7/63S/7bW+atUgsXvwOrxxrxTwAIN27eaBr3nHbW2f/vHf19N9vzZkHA37mrGKZjqRHnfLM/7CW4/KfFZ7YmczjclHMNQ3bHNYviX0yepl+BqxrmWv8vc3VbTsba85Md/aX0HoAQIKIhhSRh4HmOQ9tb5r+nz25x/6vrgOsuF4VJu9Xh+4ESP2jm0QYjb66+hpxYweXBILCRxhtk1i3OBfo/ntr3ZQ3+1pmLRvZsuAkQ1K2/mYAAPr3QVIt2N0673Pu6ID79cFtDU8Mba19WPnHh/zMWcWyJJIaZco19bB6uk8JXN3GUwJBICCstrLX1276uUff3N5UvWlbS81dQoijksq1qS0XAEjtrgvd8N2t096/q23+5TvWzrm/v6Vm8fam6s29DdN29NY/Prytbur/6al77M/ux4lkXkpQYfJ+dchOaJSn1/yL9b+06XpeHDTKzYHFeun4O3kAeES4OcvNXb31j+/fvnra1r7mWat3ts3++c6meZ8JnSRt2wAAsG2Pq+2vnzmrWKYj6VGnOki4sP4qcQ3vDKj4lITuWFSbbagttAIAQGjJ2CCEAipM3q8O3QmQ+tXAwGXN14uJ67k3oPyygO74C5EqWFWHAgCADtXtqdPPnFUs050AqV8NALg6X9TA44IAgD25VUpPAQApMlJIBQVUmLxfHRiwOgM2RWv33gBeHnTgcUnd+6RCWmC2KQoAAKbsiWy2w8+cVSzTnQCpXw+AnF83XoxrnShsf2+A7vjLZlbLUK8AgAztTAO7osLk/erQnQCpXw8AFHT/SsPV4rp19r5FsKCDrl8DUxJNKlYAAChWg79lK+BnziqW6Up81KvX+Iv1H5MbJ65oudHKmwSLddDxt+x8QnmSFQAAJAtKcSUKqDB5vzp0JD3qNMf8i/eF+wIh97LApPV3VXxsrvwmurRPF/dfx98lyYAJFEABuxTwM2cVy3QkPeo0EwAK+8V9WmDC2lusgIBCn3X92pXt6C0KoECJAipM3q8OXYmPes2GAHf/fLXxWnHdutszDQK647AkGTCBAihglwJ+5qxime4ESP1mg8CYurHisqYbxA0dd2QSBHTHn13Zjt6iAAqUKKDC5P3q0J0Aqd9sACjsnzwINF+fORAo9E/Xb0kyYAIFUMAuBfzMWcUyXYmPetNh/OX7KWsgUN4/1dN2ZTt6iwIoUKKACpP3q0N1wqO+dBp/+X7LCgiU90v1dEkyYAIFUMAuBfzMWcUy1QmP+rIBAIf34zhxebN7j0A6bxY83A89+8WubEdvUQAFShRQYfJ+dehOgNSvx3iS0P2rq68RE9rS9fhgEjqEKbMkGTCBAihglwJ+5qxiWZhkxbrZMesk9+VFDRPE+NabxcQUvFAoSR2ClG1XtqO3KIACJQqoMHm/OoIkKdbB+KPEgPtmwSvX3CRu7LjT2EcIo/RL5jYlyYAJFEABuxTwM2cVy2QmM8oCFCrFQP7yQP7tgma9ZrhSe1XNtyvb0VsUQIESBVSYvF8dqhId9QAHbgy4owLuh4dMebGQ7rgsSQZMoAAK2KWAnzmrWKY7AVK/vWDwtdXX5m8a1HmvgO74syvb0VsUQIESBVSYvF8duhMg9dsLAIV9775T4JKm6w7AQOfdSu8XKLRB129JMmACBVDALgX8zFnFMl2Jj3oxfq8YOL9uvLi06fqDjxMmf7+AVxtUzrMr29FbFECBEgVUmLxfHSqTHXVh+mFiwL1f4LLm68WEtbeKmzqTgYEw7Uli3ZJkwAQKoIBdCviZs4plSSQ1ysToZcfAmNw44T5JMHbNRHH9OnlfJpTdzrDl2ZXt6C0KoECJAipM3q+OsAmL9TF3E2LgovqrxddbbhRXt31DTFwf/T0DuvtSkgyYQAEUsEsBP3NWsUx3AqR+gEJGDFzceHX+mwQT1t4ibuoMDgQy6o5Thl3Zjt6iAAqUKKDC5P3qiJO82BbzNjUGXCC4ouUGcdXaW3zfOaC7/SXJgAkUQAG7FPAzZxXLdCdA6gciVMTA+XXjxMWN1+RHCa5ae7O4vuO2/OOGKur2q8OubEdvUQAFShRQYfJ+dfglJ5ZhzlmOAfeRw1OfvkGc+fx14hNLrxGfW3GV+LvacUJln0uSARMogAJ2KeBnziqWqUx21AVQmBYDXsfY8XMnihPn3yROffpGccbC68XZi68Rn3phgjjXBQRHLiDYle3oLQqgQIkCXglI5TzTEjLtARJUxkCUY+0D8yaKE5+6SZyy4Ebx18/cID688Hpx1vPXirMXXZsfSfj0sgninOUHgMGFhs+vHC++sOrAv791xom/rR13aKShJBkwgQIoYJcCURKQzG1UJlvqwtxNiwGZx1KUsuzKdvQWBVCgRIEoSUPmNqYlZNoDJKiMAZnHUpSySpIBEyiAAnYpECVpyNxGZbKlLszdtBiQeSxFKcuubEdvUQAFShSIkjRkbmNaQqY9QILKGJB5LEUpqyQZMIECKGCXAlGShsxtVCZb6sLcTYsBmcdSlLLsynb0FgVQoESBKElD5jamJWTaAySojAGZx1KUskqSARMogAJ2KRAlacjcRmWypS7M3bQYkHksRSnLrmxHb1EABUoUiJI0ZG5jWkKmPUCCyhiQeSxFKaskGTCBAihglwJRkobMbVQmW+rC3E2LAZnHUpSy7Mp29BYFUKBEgShJQ+Y2piVk2gMkqIwBmcdSlLJKkgETKIACdikQJWnI3EZlsqUuzN20GJB5LEUpy65sR29RAAVKFIiSNGRuY1pCpj1AgsoYkHksRSmrJBkwgQIoYJcCUZKGzG1UJlvqwtxNiwGZx1KUsuzKdvQWBVCgRIEoSUPmNqYlZNoDJKiMAZnHUpSySpIBEyiAAnYpECVpyNxGZbKlLszdtBiQeSxFKcuubEdvUQAFShSIkjRkbmNaQqY9QILKGJB5LEUpqyQZMIECKGCXAlGShsxtVCZb6sLcTYsBmcdSlLLsynb0FgVQoESBKElD5jamJWTaAySojAGZx1KUskqSARMogAJ2KRAlacjcRmWypS7M3bQYkHksRSnLrmxHb1EABUoUiJI0ZG5jWkKmPUCCyhiQeSxFKaskGTCBAihglwJRkobMbVQmW+rC3E2LAZnHUpSy7Mp29BYFUKBEgShJQ+Y2piVk2gMkqIwBmcdSlLJKkgETKIACdikQJWnI3EZlsqUuzN20GJB5LEUpy65sR29RAAVKFIiSNGRuY1pCpj1AgsoYkHksRSmrJBkwgQIoYJcCUZKGzG1UJlvqwtxNiwGZx1KUsuzKdvQWBVCgRIEoSUPmNqYlZNoDJKiMAZnHUpSySpIBEyiAAnYpECVpyNxGZbKlLszdtBiQeSxFKcuubEdvUQAFShSIkjRkbmNaQqY9QILKGJB5LEUpqyQZMIECKGCXAlGShsxtVCZb6sLcTYsBmcdSlLLsynb0FgVQoESBKElD5jamJWTaAySojAGZx1KUskqSARMogAJ2KRAlacjcRmWypS7M3bQYkHksRSnLrmxHb1EABUoUiJI0ZG5jWkKmPUCCyhiQeSxFKaskGTCBAihglwJRkobMbVQmW+rC3E2LAZnHUpSy7Mp29BYFUKBEgShJQ+Y2piVk2gMkqIwBmcdSlLJKkgETKIACdikQJWnI3EZlsqUuzN20GJB5LEUpy65sR29RAAVKFIiSNGRuY1pCpj1AgsoYkHksRSmrJBkwgQIoYJcCUZKGzG1UJlvqwtxNiwGZx1KUsuzKdvQWBVCgRIEoSUPmNqYlZNoDJKiMAZnHUpSySpIBEyiAAnYpECVpyNxGZbKlLszdtBiQeSxFKcuubEdvUQAFShSIkjRkbmNaQqY9QILKGJB5LEUpqyQZMIECKGCXAlGShsptPjh/ojjjuYniC6tuFBfUTxAqkzN1AQNhY8CNUTdW3Zh1Y1flsRKlLruyHb1FARQoUSBK0tC1zfFzJokvrLxBjKnDmMIaE+snHTPjxLkrbxDHzZ1kvOkXH78lyYAJFEABuxQoTgZp+fvjS24CAnJJGxrlB4emceLji80/2/c6vu3KdvQWBVCgRAGvpJCGee4wa/AEjZmhVXIx8PmVN6TqrL/4+C5JBkygAArYpUBxMkjT3+7lgAvquCcAY0/O2INo617zT9uwf/Fxble2o7cogAIlChQng7T97d4PECRJs45ek8yy/uel+OzfPd5LkgETKIACdimQNtMvbq97p3WWzYW+mQ8ubgwWx2Ta/rYr29FbFECBEgXSlrCK23vC/EkAADcDao2BE55K113/xceP+3dJMmACBVDALgXKE0LapjlLNv8sOcv7KG3HS3l77cp29BYFUKBEgfKEkLbpLJsLfTMfbtJ2vJS3tyQZMIECKGCXAuUJIW3TmKT5JpnlfZS246W8vXZlO3qLAihQokB5QkjbdJbNhb6ZDzdpO17K21uSDJhAARSwS4HyhJC2aUzSfJPM8j5K2/FS3l67sh29RQEUKFGgPCGkbTrL5kLfzIebtB0v5e0tSQZMoAAK2KVAeUJI2zQmab5JZnkfpe14KW+vXdmO3qIACpQoUJ4Q0jadZXOhb+bDTdqOl/L2liQDJlAABexSoDwhMJ3uF7uw/9h/YWLArmxHb1EABUoUCJMsWBdzIQayFQMlyYAJFEABuxQgoWcrobM/2Z9hYsCubEdvUQAFShQIkyxYF3MhBrIVAyXJgAkUQAG7FCChZyuhsz/Zn2FiwK5sR29RAAVKFAiTLFgXcyEGshUDJcmACRRAAbsUIKFnK6GzP9mfYWLArmxHb1EABUoUCJMsWBdzIQayFQMlyYAJFEABuxQgoWcrobM/2Z9hYsCubEdvUQAFShQIkyxYF3MhBrIVAyXJgAkUQAG7FCChZyuhsz/Zn2FiwK5sR29RAAVKFAiTLFgXcyEGshUDJcmACRRAAbsUIKFnK6GzP9mfYWLArmxHb1EABUoUCJMsWBdzIQayFQMlyYAJFEABuxQgoWcrobM/2Z9hYsCubEdvUQAFShQIkyxYF3MhBrIVAyXJgAkUQAG7FCChZyuhsz/Zn2FiwK5sR29RAAVKFAiTLFgXcyEGshUDJcmACRRAAbsUIKFnK6GzP9mfYWLArmxHb1EABUoUCJMsWBdzIQayFQMlyYAJFEABuxQgoWcrobM/2Z9hYsCubEdvUQAFShQIkyxYF3MhBrIVAyXJgAkUQAG7FCChZyuhsz/Zn2FiwK5sR29RAAVKFAiTLFgXcyEGshUDJcmACRRAAbsUIKFnK6GzP9mfYWLArmxHb1EABUoUCJMsWBdzIQayFQMlyYAJFEABuxQgoWcrobM/2Z9hYsCubEdvUQAFShQIkyxYF3MhBrIVAyXJgAkUQAG7FCChZyuhsz/Zn2FiwK5sR29RAAVKFAiTLFgXcyEGshUDJcmACRRAAbsUIKFnK6GzP9mfYWLArmxHb1EABUoUCJMsWBdzIQayFQMlyYAJFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEABFEiBAv8/dDwDRJQa8yIAAAAASUVORK5CYII="
            />
        </Defs>
    </Svg>
);

export const Delivered = (props) => (
    <Svg
        width={186}
        height={186}
        viewBox="0 0 186 186"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >

        <Circle cx={93} cy={93} r={93} fill="#39C57E" fillOpacity={0.13}  {...props} />
        <Circle cx={93} cy={93} r={81} fill="#39C57E" fillOpacity={0.46}  {...props} />
        <Circle cx={93} cy={93} r={68} fill="#39C57E"  {...props} />
        <Path
            d="M71.0308 96.1385L85.6769 110.785L114.969 79.4"
            stroke="white"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        />
    </Svg>
);