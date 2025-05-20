import type { DealFilter } from "~/shared/api/generated";
export interface IProps {
  filter?: DealFilter;
  keyword?: string;
  stages?: { id: string; title: string }[] | null;
}
