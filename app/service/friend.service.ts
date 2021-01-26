'use strict';
// @ts-ignore
import { FriendsIndexListsItem } from '../../types'
export default class FriendService {
  // 组合index数据
  public static computedIndexLists(lists = ['']) {
    const indexLists = []
    const indexs: any[] = []
    for (let i = 0; i < lists.length; i ++) {
      const _tmp:any = lists[i]
      if (!indexs.includes(_tmp.first_word)) {
        const _item: FriendsIndexListsItem = {
          letter: _tmp.first_word,
          data: [_tmp]
        }
        indexs.push(_tmp.first_word)
        indexLists.push(_item)
      } else {
        const _itemIndex = indexLists.findIndex(item => {
          return item.letter === _tmp.first_word
        })
        indexLists[_itemIndex].data.push(_tmp)
      }
    }
    return {indexs, indexLists}
  }
}
