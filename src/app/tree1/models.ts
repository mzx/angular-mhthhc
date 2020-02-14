export type ValueOf<T> = T[keyof T];
export type Data = {id: string, widget: WidgetsEnumType, children: Data[], value: any}; // TODO

export class TreeNode<D> {
  data: D;
  children: TreeNode<D>[];
}

export class FlatTreeNode<D> extends TreeNode<D> {
  level: number;
  expandable: boolean;
}

export const WidgetsEnum = {
  plus_placeholder: 'plus_placeholder',
  group: 'group',
  criterion: 'criterion'
};
export type WidgetsEnumType = ValueOf<typeof WidgetsEnum>;
