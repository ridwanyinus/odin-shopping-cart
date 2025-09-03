interface IconProps {
	className?: string;
}

export const OfflineIcon = ({ className }: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		className={className}
		role="img"
		aria-label="Offline"
	>
		<path
			fill="currentColor"
			d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
		/>
		<rect width="176" height="32" x="168" y="320" fill="currentColor" />
		<polygon
			fill="currentColor"
			points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
		/>
		<polygon
			fill="currentColor"
			points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
		/>
	</svg>
);
export const ErroIcon = ({ className }: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		className={className}
		role="img"
		aria-label="Error"
	>
		<path
			fill="currentColor"
			d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
		/>
	</svg>
);

export const WarningIcon = ({ className }: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		className={className}
		role="img"
		aria-label="Warning"
	>
		<path
			fill="currentColor"
			d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
		/>
	</svg>
);

export const InfoIcon = ({ className }: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		className={className}
		role="img"
		aria-label="Information"
	>
		<path
			fill="currentColor"
			d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
		/>
	</svg>
);
