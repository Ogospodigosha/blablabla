import {UserInterface, UserInterfaceResponse} from "../models/interfaces/user.interface";

type UsersDTOAdapter = {
  DTOtoEntity(dto:UserInterfaceResponse):UserInterface
}

export const UsersDTOAdapter:UsersDTOAdapter = {
  DTOtoEntity(dto): UserInterface {
      const {company, address, ...entity} = dto;
      return entity
  }
}
