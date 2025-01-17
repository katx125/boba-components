import React from "react";
import Button, { ButtonStyle } from "../buttons/Button";
import DropdownListMenu, { DropdownStyle } from "../common/DropdownListMenu";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { LinkWithAction } from "types";

const UserBar: React.FC<UserBarProps> = ({
  user,
  color,
  onClick,
  loading,
  menuOptions,
  compact,
}) => {
  const indicator = (
    <Button
      icon={user?.avatarUrl || faUser}
      onClick={onClick}
      color={color}
      theme={ButtonStyle.DARK}
      compact={compact}
    >
      {loading ? "loading..." : user?.username || "Login"}
    </Button>
  );

  return (
    <div className="container">
      {menuOptions ? (
        <DropdownListMenu
          options={menuOptions}
          style={DropdownStyle.DARK}
          accentColor={color}
        >
          {indicator}
        </DropdownListMenu>
      ) : (
        indicator
      )}
      <style jsx>{``}</style>
    </div>
  );
};

export default UserBar;

export interface UserBarProps {
  user?: { username: string; avatarUrl?: string };
  loading?: boolean;
  color?: string;
  onClick?: () => void;
  menuOptions?: {
    name: string;
    link: LinkWithAction;
  }[];
  compact?: boolean;
}
