import { ComboboxOption, ComboboxOptionProps } from "@headlessui/react";
import { Platform } from "@lib/types/property";

interface SearchListItemProps extends ComboboxOptionProps {
  platform: Platform;
}

function SearchListItem({ value: nickname, platform }: SearchListItemProps) {
  return <ComboboxOption value={nickname}>{nickname}</ComboboxOption>;
}

export default SearchListItem;
