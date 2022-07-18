import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Table from "./Table";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "IterableTable";



export class IterableTable 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "IterableTable";
  static typeParameters: TypeParamDeclType[] = [
    { name: "K", isPhantom: false },
    { name: "V", isPhantom: false }
  ];
  static fields: FieldDeclType[] = [
  { name: "inner", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new $.TypeParamIdx(0), new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "head", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [new $.TypeParamIdx(0)]) },
  { name: "tail", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [new $.TypeParamIdx(0)]) }];

  inner: Table.Table;
  head: Std.Option.Option;
  tail: Std.Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.inner = proto['inner'] as Table.Table;
    this.head = proto['head'] as Std.Option.Option;
    this.tail = proto['tail'] as Std.Option.Option;
  }

  static IterableTableParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : IterableTable {
    const proto = $.parseStructProto(data, typeTag, repo, IterableTable);
    return new IterableTable(proto, typeTag);
  }

}

export class IterableValue 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "IterableValue";
  static typeParameters: TypeParamDeclType[] = [
    { name: "K", isPhantom: false },
    { name: "V", isPhantom: false }
  ];
  static fields: FieldDeclType[] = [
  { name: "val", typeTag: new $.TypeParamIdx(1) },
  { name: "prev", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [new $.TypeParamIdx(0)]) },
  { name: "next", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [new $.TypeParamIdx(0)]) }];

  val: any;
  prev: Std.Option.Option;
  next: Std.Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.val = proto['val'] as any;
    this.prev = proto['prev'] as Std.Option.Option;
    this.next = proto['next'] as Std.Option.Option;
  }

  static IterableValueParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : IterableValue {
    const proto = $.parseStructProto(data, typeTag, repo, IterableValue);
    return new IterableValue(proto, typeTag);
  }

}
export function add$ (
  table: IterableTable,
  key: any,
  val: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): void {
  let k, wrapped_value;
  wrapped_value = new IterableValue({ val: val, prev: $.copy(table.tail), next: Std.Option.none$($c, [$p[0]] as TypeTag[]) }, new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]]));
  Table.add$(table.inner, $.copy(key), wrapped_value, $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]);
  if (Std.Option.is_some$(table.tail, $c, [$p[0]] as TypeTag[])) {
    k = Std.Option.borrow$(table.tail, $c, [$p[0]] as TypeTag[]);
    Table.borrow_mut$(table.inner, $.copy(k), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]).next = Std.Option.some$($.copy(key), $c, [$p[0]] as TypeTag[]);
  }
  else{
    table.head = Std.Option.some$($.copy(key), $c, [$p[0]] as TypeTag[]);
  }
  table.tail = Std.Option.some$($.copy(key), $c, [$p[0]] as TypeTag[]);
  return;
}

export function append$ (
  v1: IterableTable,
  v2: IterableTable,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): void {
  let key, next, val;
  key = head_key$(v2, $c, [$p[0], $p[1]] as TypeTag[]);
  while (Std.Option.is_some$(key, $c, [$p[0]] as TypeTag[])) {
    {
      [val, , next] = remove_iter$(v2, $.copy(Std.Option.borrow$(key, $c, [$p[0]] as TypeTag[])), $c, [$p[0], $p[1]] as TypeTag[]);
      add$(v1, $.copy(Std.Option.borrow$(key, $c, [$p[0]] as TypeTag[])), val, $c, [$p[0], $p[1]] as TypeTag[]);
      key = $.copy(next);
    }

  }return;
}

export function borrow$ (
  table: IterableTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): any {
  return Table.borrow$(table.inner, $.copy(key), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]).val;
}

export function borrow_iter$ (
  table: IterableTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): [any, Std.Option.Option, Std.Option.Option] {
  let v;
  v = Table.borrow$(table.inner, $.copy(key), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]);
  return [v.val, $.copy(v.prev), $.copy(v.next)];
}

export function borrow_iter_mut$ (
  table: IterableTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): [any, Std.Option.Option, Std.Option.Option] {
  let v;
  v = Table.borrow_mut$(table.inner, $.copy(key), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]);
  return [v.val, $.copy(v.prev), $.copy(v.next)];
}

export function borrow_mut$ (
  table: IterableTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): any {
  return Table.borrow_mut$(table.inner, $.copy(key), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]).val;
}

export function contains$ (
  table: IterableTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): boolean {
  return Table.contains$(table.inner, $.copy(key), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]);
}

export function destroy_empty$ (
  table: IterableTable,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): void {
  if (!empty$(table, $c, [$p[0], $p[1]] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  if (!Std.Option.is_none$(table.head, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  if (!Std.Option.is_none$(table.tail, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  let { inner: inner } = table;
  Table.destroy_empty$(inner, $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function empty$ (
  table: IterableTable,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): boolean {
  return Table.empty$(table.inner, $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]);
}

export function head_key$ (
  table: IterableTable,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): Std.Option.Option {
  return $.copy(table.head);
}

// #[test]
export function iterable_table_test$ (
  $c: AptosDataCache,
): void {
  let i, key, key__1, next, prev, table, table2, val, val__2;
  table = new__$($c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  i = u64("0");
  while ($.copy(i).lt(u64("100"))) {
    {
      add$(table, $.copy(i), $.copy(i), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).add(u64("1"));
    }

  }if (!length$(table, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(u64("100"))) {
    throw $.abortCode(u64("0"));
  }
  i = u64("0");
  while ($.copy(i).lt(u64("100"))) {
    {
      if (!remove$(table, $.copy(i), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq($.copy(i))) {
        throw $.abortCode(u64("0"));
      }
      i = $.copy(i).add(u64("2"));
    }

  }if (!!empty$(table, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  key = head_key$(table, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  i = u64("1");
  while (Std.Option.is_some$(key, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    {
      [val, , next] = borrow_iter$(table, $.copy(Std.Option.borrow$(key, $c, [AtomicTypeTag.U64] as TypeTag[])), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
      if (!$.copy(val).eq($.copy(i))) {
        throw $.abortCode(u64("0"));
      }
      key = $.copy(next);
      i = $.copy(i).add(u64("2"));
    }

  }if (!$.copy(i).eq(u64("101"))) {
    throw $.abortCode(u64("0"));
  }
  table2 = new__$($c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  append$(table2, table, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  destroy_empty$(table, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  key__1 = tail_key$(table2, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  while (Std.Option.is_some$(key__1, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    {
      [val__2, prev, ] = remove_iter$(table2, $.copy(Std.Option.borrow$(key__1, $c, [AtomicTypeTag.U64] as TypeTag[])), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
      if (!$.copy(val__2).eq($.copy(Std.Option.borrow$(key__1, $c, [AtomicTypeTag.U64] as TypeTag[])))) {
        throw $.abortCode(u64("0"));
      }
      key__1 = $.copy(prev);
    }

  }destroy_empty$(table2, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  return;
}

export function length$ (
  table: IterableTable,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): U64 {
  return Table.length$(table.inner, $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]);
}

export function new__$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): IterableTable {
  return new IterableTable({ inner: Table.new__$($c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]), head: Std.Option.none$($c, [$p[0]] as TypeTag[]), tail: Std.Option.none$($c, [$p[0]] as TypeTag[]) }, new StructTag(new HexString("0x1"), "IterableTable", "IterableTable", [$p[0], $p[1]]));
}

export function remove$ (
  table: IterableTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): any {
  let val;
  [val, , ] = remove_iter$(table, $.copy(key), $c, [$p[0], $p[1]] as TypeTag[]);
  return val;
}

export function remove_iter$ (
  table: IterableTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): [any, Std.Option.Option, Std.Option.Option] {
  let key__1, key__2, val;
  val = Table.remove$(table.inner, $.copy(key), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]);
  if (Std.Option.contains$(table.tail, key, $c, [$p[0]] as TypeTag[])) {
    table.tail = $.copy(val.prev);
  }
  else{
  }
  if (Std.Option.contains$(table.head, key, $c, [$p[0]] as TypeTag[])) {
    table.head = $.copy(val.next);
  }
  else{
  }
  if (Std.Option.is_some$(val.prev, $c, [$p[0]] as TypeTag[])) {
    key__1 = Std.Option.borrow$(val.prev, $c, [$p[0]] as TypeTag[]);
    Table.borrow_mut$(table.inner, $.copy(key__1), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]).next = $.copy(val.next);
  }
  else{
  }
  if (Std.Option.is_some$(val.next, $c, [$p[0]] as TypeTag[])) {
    key__2 = Std.Option.borrow$(val.next, $c, [$p[0]] as TypeTag[]);
    Table.borrow_mut$(table.inner, $.copy(key__2), $c, [$p[0], new StructTag(new HexString("0x1"), "IterableTable", "IterableValue", [$p[0], $p[1]])] as TypeTag[]).prev = $.copy(val.prev);
  }
  else{
  }
  let { val: val__3, prev: prev, next: next } = val;
  return [val__3, $.copy(prev), $.copy(next)];
}

export function tail_key$ (
  table: IterableTable,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): Std.Option.Option {
  return $.copy(table.tail);
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::IterableTable::IterableTable", IterableTable.IterableTableParser);
  repo.addParser("0x1::IterableTable::IterableValue", IterableValue.IterableValueParser);
}
