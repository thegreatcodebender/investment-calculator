import { PropsWithChildren } from "react";

interface CommonProps {
  haveBorder?: boolean;
}

export const TR: React.FC<PropsWithChildren> = ({ children }) => {
  return <tr>{children}</tr>;
};

export const THEAD: React.FC<PropsWithChildren> = ({ children }) => {
  return <thead>{children}</thead>;
};

export const TBODY: React.FC<PropsWithChildren> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TD: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <td className="border-1 p-2 align-middle" align="left">
      {children}
    </td>
  );
};

export const TH: React.FC<PropsWithChildren<CommonProps>> = ({
  children,
  haveBorder = true,
}) => {
  return (
    <th
      className={`p-2 align-middle font-semibold${
        haveBorder ? " border-1" : ""
      }`}
      align="left"
    >
      {children}
    </th>
  );
};
