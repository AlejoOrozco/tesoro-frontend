import Link from "next/link";
import type { ReactElement } from "react";

import { HEADER_ICON_BUTTON_CLASSES, HEADER_ICON_GLYPH_CLASSES } from "@/components/header-icon-styles";
import { CartIcon, UserIcon } from "@/components/icons";
import { ACCOUNT_ICON_BY_ID, type AccountIconId } from "@/lib/navigation";

const ACCOUNT_ICONS: Record<AccountIconId, (props: { readonly className?: string }) => ReactElement> = {
  cart: CartIcon,
  account: UserIcon,
};

function HeaderIconLink({ id }: { readonly id: AccountIconId }): ReactElement {
  const item = ACCOUNT_ICON_BY_ID[id];
  const Icon = ACCOUNT_ICONS[id];
  return (
    <Link href={item.href} className={HEADER_ICON_BUTTON_CLASSES}>
      <Icon className={HEADER_ICON_GLYPH_CLASSES} />
      {item.label}
    </Link>
  );
}

/** Account, then cart on the far right. */
export function HeaderAccountIcons(): ReactElement {
  return (
    <ul className="flex items-center gap-4">
      <li>
        <HeaderIconLink id="account" />
      </li>
      <li>
        <HeaderIconLink id="cart" />
      </li>
    </ul>
  );
}
