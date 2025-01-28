// src/components/MobileMenu.tsx
/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

/**
 * Components
 */
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "./ui/separator";

/**
 * Assets
 */
import { ChevronsUpDown } from "lucide-react";

/**
 * Types
 */
import type { MenuItem } from "@/types";

type MobileMenuProps = {
	navMenu: MenuItem[];
};

const MobileMenu = ({ navMenu }: MobileMenuProps) => {
	return (
		<div>
			<ul className="mb-3">
				{navMenu.map(({ href, label, submenu }, index) => (
					<li key={index}>
						{submenu ? (
							<Collapsible>
								<CollapsibleTrigger asChild>
									<Button variant="ghost" className="w-full justify-between">
										<span>{label}</span>
										<ChevronsUpDown className="h-4 w-4" />
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className="ps-2">
									<ul className="border-l border-l-muted-foreground/20">
										{submenu.map(({ href, label }, index) => (
											<li key={index}>
												<Button
													asChild
													variant="ghost"
													className="w-full justify-start text-muted-foreground hover:bg-transparent"
												>
													<a href={href}>{label}</a>
												</Button>
											</li>
										))}
									</ul>
								</CollapsibleContent>
							</Collapsible>
						) : (
							<Button asChild variant="ghost" className="w-full justify-start">
								<a href={href}>{label}</a>
							</Button>
						)}
					</li>
				))}
			</ul>

			<Separator className="bg-muted-foreground/20" />

			<div className="flex items-center gap-2 mt-4">
				<Button variant="ghost" className="w-full ">
					<a href="#">Login</a>
				</Button>

				<Button className="w-full">Teste Gratis</Button>
			</div>
		</div>
	);
};

export default MobileMenu;
