import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface InputProps extends React.ComponentProps<"input"> {
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	error: string;
	onPressRightIcon?: () => void;
}

function Input({
	className,
	type,
	leftIcon,
	rightIcon,
	error,
	onPressRightIcon = () => {},
	...props
}: InputProps) {
	const borderColor = error ? "border-destructive/30" : "border-input";
	const borderColorFocus = error
		? "focus-within:border-destructive/60"
		: "focus-within:border-foreground/40";
	const fontPlaceholderColor = error
		? "placeholder:text-destructive/60"
		: "placeholder:text-muted-foreground";

	return (
		<div>
			<div
				className={`relative flex items-center w-full border-b-2 ${borderColor} ${borderColorFocus} transition-colors`}
			>
				{leftIcon && (
					<div
						className={cn(
							"size-4 flex items-center justify-center",
							props.disabled && "opacity-50",
							error ? "text-destructive" : "text-muted-foreground"
						)}
					>
						{leftIcon}
					</div>
				)}
				<input
					type={type}
					data-slot="input"
					className={cn(
						fontPlaceholderColor,
						"file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 bg-transparent px-3 py-1 text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						"focus:border-transparent focus-visible:ring-0",
						"focus-visible:outline-none",
						className
					)}
					{...props}
				/>
				{rightIcon && (
					<Button
						variant="ghost"
						size="icon"
						onClick={onPressRightIcon}
						className={cn(
							props.disabled && "opacity-50 pointer-events-none",
							error ? "text-destructive" : "text-muted-foreground"
						)}
					>
						{rightIcon}
					</Button>
				)}
			</div>
			<div className="my-1">
				<p className={cn("text-destructive", !error && "select-none")}>
					{error || "⠀"}
				</p>
			</div>
		</div>
	);
}

export { Input };
