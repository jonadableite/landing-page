/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

type MenuItem = {
	href: string;
	label: string;
	submenu?: SubmenuItem[];
};

type SubmenuItem = {
	href: string;
	icon: JSX.Element;
	label: string;
	desc: string;
};

export type { MenuItem };
