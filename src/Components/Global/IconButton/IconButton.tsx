import classNames from "classnames";

const IconButton = ({
    children,
    className,
    ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
    return (
        <div
            {...props}
            className={classNames(
                "w-16 h-16 flex items-center justify-center rounded-full text-white hover:bg-[rgba(255,255,255,0.1)]",
                className
            )}
        >
            {children}
        </div>
    );
};

export default IconButton;
