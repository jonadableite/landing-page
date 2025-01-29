/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

/**
 * Components
 */
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
/**
 * Assets
 */

import { Menu } from "lucide-react";

/**
 * Constants
 */
import { navMenu } from "@/constants";

const Header = () => {
	const navigate = useNavigate();

	const handleStartTrial = () => {
		navigate("/trial-form");
	};

	const handleLogin = () => {
		window.location.href = "https://aquecer.whatlead.com.br/login";
	};

	return (
		<header className="border h-16 grid grid-cols-1 items-center md:h-20 lg:h-24">
			<div className="container flex items-center justify-between">
				<Logo variant="default" />

				<div className="flex-grow flex justify-center">
					<NavigationMenu className="max-lg:hidden">
						<NavigationMenuList>
							{navMenu.map(({ href, label, submenu }, index) => (
								<NavigationMenuItem key={index}>
									{submenu ? (
										<>
											<NavigationMenuTrigger>{label}</NavigationMenuTrigger>

											<NavigationMenuContent>
												<ul className="grid grid-cols-2 gap-2 p-2 w-[640px]">
													{submenu.map(({ href, icon, label, desc }, index) => (
														<li key={index}>
															<NavigationMenuLink asChild>
																<a
																	href={href}
																	className="flex gap-3 select-none p-2 rounded-sm transition-colors hover:bg-foreground/5"
																>
																	<div className="w-10 h-10 bg-foreground/10 rounded-sm shadow-sm border-t border-foreground/5 flex-shrink-0 grid place-items-center">
																		{icon}
																	</div>

																	<div>
																		<div className="text-[13px] leading-normal mb-1">
																			{label}
																		</div>

																		<p className="text-[13px] leading-normal text-muted-foreground">
																			{desc}
																		</p>
																	</div>
																</a>
															</NavigationMenuLink>
														</li>
													))}
												</ul>
											</NavigationMenuContent>
										</>
									) : (
										<NavigationMenuLink
											href={href}
											className={navigationMenuTriggerStyle()}
										>
											{label}
										</NavigationMenuLink>
									)}
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="flex items-center space-x-2">
					<div className="hidden lg:flex items-center space-x-2">
						<Button variant="ghost" onClick={handleLogin}>
							Login
						</Button>
						<Button onClick={handleStartTrial}>Teste Grátis</Button>
					</div>

					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" size="icon" className="lg:hidden">
								<Menu />
							</Button>
						</PopoverTrigger>

						<PopoverContent
							align="end"
							className="bg-background/50 backdrop-blur-3xl border-foreground/5 border-x-0 border-b-0 rounded-lg overflow-hidden"
						>
							<MobileMenu
								navMenu={navMenu}
								onLogin={handleLogin}
								onStartTrial={handleStartTrial}
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	);
};

export default Header;
