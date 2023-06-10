// auto generated incremental id

import { User } from './user.model'

//ekhane amra user er id auto increment korar jonno database theke last je id create hoice seta k niye ase 1++ kore increment korbo

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

// jodi last user thake tahole last user dibe noyto new user create korbe

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')

  //   increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  return incrementedId
}
