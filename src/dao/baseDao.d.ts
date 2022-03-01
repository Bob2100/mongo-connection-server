export default {
  /**
   * 查询一个doc
   * @param db - 数据库名称
   * @param collection - 集合名称
   * @param query - 查询条件
   * @param options - 查询配置
   * @returns Object为文档对象
   * @example
   * ```
   * findOne('test','fruits')
   * ```
   */
  findOne(
    db: string,
    collection: string,
    query: Object,
    options: Object
  ): Promise<Object>,
}
