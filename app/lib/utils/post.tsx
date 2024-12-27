import { Fragment } from "react";

import type { TroublemakerInfo } from "#lib/types/response.js";
import type { SearchState } from "#lib/types/state.js";
import Divider from "#ui/Divider/Divider.jsx";
import Loading from "#ui/SearchList/Loading.jsx";
import NoResults from "#ui/SearchList/NoResults.jsx";
import SearchListItem from "#ui/SearchList/SearchListItem.jsx";

let idxCounter = 0;

export function postDataToJSX(
  state: SearchState,
  activeItemIdx?: number,
  single?: boolean
) {
  let Items: JSX.Element | JSX.Element[] = <></>;
  const troublemakerMapper = (troublemaker: TroublemakerInfo) => (
    <Fragment key={troublemaker.id}>
      <SearchListItem
        itemInfo={troublemaker}
        isActive={idxCounter++ === activeItemIdx}
      />
      <Divider direction="horizon" />
    </Fragment>
  );

  const { status, troublemakers } = state;
  if (status === "LOADING") {
    Items = (
      <>
        <Loading single={single} />
        <Divider direction="horizon" />
      </>
    );
  } else if (status === "ERROR") {
    Items = (
      <>
        <NoResults error={true} single={single} />
        <Divider direction="horizon" />
      </>
    );
  } else if (troublemakers.length <= 0) {
    Items = (
      <>
        <NoResults single={single} />
        <Divider direction="horizon" />
      </>
    );
  } else {
    Items = troublemakers.map(troublemakerMapper);

    if (status === "LOADING_MORE") {
      Items.push(
        <Fragment key="loadingMore">
          <Loading single={single} />
          <Divider direction="horizon" />
        </Fragment>
      );
    }
  }

  return Items;
}
