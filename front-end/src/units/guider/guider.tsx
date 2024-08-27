import { Sizes, StyleProps } from "../../constant";

interface guiderPropTypes extends StyleProps {
  path: string;
  title: string;
}

export const Guider = ({
  path,
  title,
  textSize = Sizes.md,
  className,
}: guiderPropTypes) => {
  return (
    <button
      className={`text-${textSize} text-text-secondaryBrand ${className} no-underline`}
      onClick={() => {
        const element = document.getElementById(path);
        element?.scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      {title}
    </button>
  );
};
