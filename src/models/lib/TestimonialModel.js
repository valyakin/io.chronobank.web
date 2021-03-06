import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

export default class TestimonialModel {
  constructor ({ id, name, position, image, image2x, image448, image2x448, brief }) {
    this.id = id
    this.name = name
    this.position = position
    assert(image == null || image instanceof ImageModel)
    this.image = image
    assert(image2x == null || image2x instanceof ImageModel)
    this.image2x = image2x
    assert(image448 == null || image448 instanceof ImageModel)
    this.image448 = image448
    assert(image2x448 == null || image2x448 instanceof ImageModel)
    this.image2x448 = image2x448
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new TestimonialModel({
      ...data,
      image: ImageModel.fromJS(data.image),
      image2x: ImageModel.fromJS(data.image2x),
      image448: ImageModel.fromJS(data.image448),
      image2x448: ImageModel.fromJS(data.image2x448),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? null : new TestimonialModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      name: localeModelFields.getLocaleField('name'),
      position: localeModelFields.getLocaleField('position'),
      brief: localeModelFields.getLocaleField('brief'),
      image: ImageModel.fromServerModel(data.image),
      image2x: ImageModel.fromServerModel(data.image2x),
      image448: ImageModel.fromServerModel(data.image448),
      image2x448: ImageModel.fromServerModel(data.image2x448),
    })
  }
}
