import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

export default class ProductDownloadModel {
  constructor ({ id, title, url, icon }) {
    this.id = id
    this.title = title
    this.url = url
    assert(icon == null || icon instanceof ImageModel)
    this.icon = icon
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new ProductDownloadModel({
      ...data,
      icon: ImageModel.fromJS(data.icon),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new ProductDownloadModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title') ,
      url: data.url,
      icon: data.icon
        ? ImageModel.fromServerModel(data.icon)
        : null,
    })
  }
}
