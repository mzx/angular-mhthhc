import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Data, FlatTreeNode, TreeNode, WidgetsEnum, WidgetsEnumType } from 'src/app/tree1/models';

@Component({
  selector: 'app-tree1',
  templateUrl: './tree1.component.html',
  styleUrls: ['./tree1.component.scss']
})
export class Tree1Component implements OnInit, OnChanges {
  @Input() data: any;
  WidgetsEnum = WidgetsEnum;
  treeControl: FlatTreeControl<FlatTreeNode<Data>>;
  dataSource: MatTreeFlatDataSource<TreeNode<Data>, FlatTreeNode<Data>>;
  treeFlattener: MatTreeFlattener<TreeNode<Data>, FlatTreeNode<Data>>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, ({children}) => children);
    this.treeControl = new FlatTreeControl<FlatTreeNode<Data>>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource<TreeNode<Data>, FlatTreeNode<Data>>(this.treeControl, this.treeFlattener);
  }

  ngOnInit() {
  }

  ngOnChanges({data}: SimpleChanges): void {
    if (data) {
      this.dataSource.data = this.buildTree(data.currentValue);
      console.log(this.dataSource.data);

      this.treeControl.expandAll();
    }
  }

  transformer = (node: TreeNode<Data>, level: number): FlatTreeNode<Data> => ({
    ...node,
    level,
    expandable: !!node.children && node.children.length > 0
  });

  getLevel = ({level}): number => level;

  isExpandable = (node): boolean => node.expandable;

  whenWidgetIs = (widget: WidgetsEnumType) =>
    (_: number, node: FlatTreeNode<Data>) => node.data.widget === widget

  addCriterioHandler(node: any) {
    const parent = this.findDataById(this.data, node.data.parentId);
    const id = Math.random().toString(32);
    const newItem = {
      id,
      widget: 'criterion',
      value: {a: null, b: null, c: null},
      children: []
    };

    this.appendBeforeLast(parent ? parent.children : this.data, newItem)

    this.dataSource.data = this.buildTree(this.data);
    this.treeControl.expandAll();
  }

  addGrupoHandler(node: any) {
    const parent = this.findDataById(this.data, node.data.parentId);
    const id = Math.random().toString(32);
    const newItem = {
      id,
      widget: 'group',
      value: 'AND',
      children: [{widget: 'plus_placeholder', parentId: id, id: Math.random().toString(32)}]
    };

    this.appendBeforeLast(parent ? parent.children : this.data, newItem)

    this.dataSource.data = this.buildTree(this.data);
    this.treeControl.expandAll();
  }

  private buildTree(d, parentId = null) {
    return !d ? [] : d.map(data => ({data, parentId, children: this.buildTree(data.children, data.id)}));
  }

  private findDataById(items: {id: string, children: any[]}[], parentId: string | null) {
    if (!parentId) {
      return null;
    } else {
      const stack = [...items];
      while (stack.length) {
        const item = stack.shift();
        if (item.id === parentId) {
          return item;
        } else if (item.children && item.children.length > 0) {
          stack.push(...item.children);
        }
      }
    }
    return null;
  }

  private appendBeforeLast(children: any[], newItem: any) {
    children.push(children[children.length - 1]);
    children[children.length - 2] = newItem;
  }
}
