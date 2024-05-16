
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {  JwtService } from "@nestjs/jwt";
import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { OrNeverType } from "src/utils/types/or-never.type";
import { JwtPayloadType } from "./strategies/types/jwt-payload.type";
import { JwtRefreshPayloadType } from "./strategies/types/jwt-refresh-payload.type";
import * as dotenv from "dotenv";
import { MailData } from "src/mail/interfaces/mail-data.interface";
import { User } from "../user/entities/user.entity";
import { DeepPartial } from "typeorm";
import { NullableType } from "src/utils/types/nullable.type";
import { EntityCondition } from "src/utils/types/entity-condition.type";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { Forgot } from "../forgot/entities/forgot.entity";
import { FindOptions } from "src/utils/types/find-options.type";
import { Session } from "../session/entities/session.entity";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "src/config/config.type";
import { UserStatus } from "../user/entities/user-status.entity";
import { UserRole } from "../user/entities/user-role.entity";
import { Cooperated } from "../cooperated/entities/cooperated.entity";
import { CreateCooperatedDto } from "../cooperated/dto/create-cooperated.dto";

dotenv.config();

const user = new User();
const userStatus = new UserStatus();
const userRole = new UserRole();
const cooperated = new Cooperated();
const session = new Session();
const forgot = new Forgot();


cooperated.firstName = 'firstName'
cooperated.id = 1
cooperated.email = "test@example.com";
cooperated.firstName = 'firstName'
cooperated.lastName = 'lastName'
cooperated.phone = '27997000065'
cooperated.document = '51260605035'
cooperated.createdAt = new Date();
cooperated.updatedAt = new Date();
cooperated.deletedAt = new Date();

userRole.id = 1;
userRole.name = "admin";

userStatus.id = 1;
userStatus.name = "Active";

user.id = 1;
user.email = "test@example.com";
user.password = "$2a$10$yJyGsexHRWW37yGtCFMSR.Y4kL7QcX8Eyl7Kam8E1L3fkxvFrHhE2";
user.previousPassword = "previousPassword";
user.provider = "email";
user.socialId = "socialId";
user.firstName = "firstName";
user.lastName = "lastName";
user.photo = null;
user.role = userRole;
user.status = userStatus;
user.hash = "hash";
user.createdAt = new Date();
user.updatedAt = new Date();
user.deletedAt = new Date();


session.id = 1
session.user = user
session.createdAt = new Date()
session.deletedAt = new Date()


forgot.createdAt = new Date();
forgot.deletedAt = new Date();
forgot.id = 1
forgot.hash = 'hash'
forgot.user = user

// class IsExistMocked implements ValidatorConstraintInterface {
//   validate = jest.fn(async (_value: string, _validationArguments: ValidationArguments): Promise<boolean> => false);
// }

// class IsNotExistMocked implements ValidatorConstraintInterface {
//   validate = jest.fn(async (_value: string, _validationArguments: ValidationArguments): Promise<boolean> => false);
// }

// class JwtStrategyMocked {
//   validate = jest.fn((_payload: JwtPayloadType): OrNeverType<JwtPayloadType> => {
//     return { id: 1, sessionId: 1, iat: 1, exp: 1 };
//   });
// }

// class JwtRefreshStrategyMocked {
//   validate = jest.fn((_payload: JwtRefreshPayloadType): OrNeverType<JwtRefreshPayloadType> => {
//     return { sessionId: 1, iat: 1, exp: 1 };
//   });
// }

// class AnonymousStrategyMocked {
//   validate = jest.fn((_payload: unknown, _request: unknown): unknown => {
//     return jest.fn();
//   });
// }

class MailServiceMocked {
  userSignUp = jest.fn(async (_mailData: MailData<{ hash: string }>): Promise<void> => {});
  forgotPassword = jest.fn(async (mailData: MailData<{ hash: string }>): Promise<void> => {});
}

class UsersServiceMocked {
  create = jest.fn(async (_createProfileDto: CreateUserDto): Promise<User> => {
    return user;
  });

  findManyWithPagination = jest.fn(async (_paginationOptions: IPaginationOptions): Promise<User[]> => {
    return [user];
  });
  findOne = jest.fn(async (_fields: EntityCondition<User>): Promise<NullableType<User>> => {
    return user;
  });

  update = jest.fn(async (_id: User["id"], _payload: DeepPartial<User>): Promise<User> => {
    return user;
  });

  softDelete = jest.fn(async (_id: User["id"]): Promise<void> => {});
}

class ForgotServiceMocked {
  findOne = jest.fn(async (_options: FindOptions<Forgot>): Promise<NullableType<Forgot>> => {
    return new Forgot();
  });

  findMany = jest.fn(async (_options: FindOptions<Forgot>): Promise<Forgot[]> => {
    return [new Forgot()];
  });

  create = jest.fn(async (_data: DeepPartial<Forgot>): Promise<Forgot> => {
    return new Forgot();
  });

  softDelete = jest.fn(async (_id: Forgot["id"]): Promise<void> => {});
}

class SessionServiceMocked {
  findOne = jest.fn(async (_options: FindOptions<Session>): Promise<NullableType<Session>> => {
    return new Session();
  });

  findMany = jest.fn(async (_options: FindOptions<Session>): Promise<Session[]> => {
    return [new Session()];
  });

  create = jest.fn(async (_data: DeepPartial<Session>): Promise<Session> => {
    return new Session();
  });


   softDelete = jest.fn(async({
    excludeId,
    ..._criteria
  }: {
    id?: Session['id'];
    user?: Pick<User, 'id'>;
    excludeId?: Session['id'];
  }): Promise<void> => {})
}

class CooperatedServiceMocked {
  create = jest.fn(async (_createCooperatedDto: CreateCooperatedDto): Promise<Cooperated> => {return new Cooperated() })

  findManyWithPagination = jest.fn(async (
    _paginationOptions: IPaginationOptions,
  ): Promise<Cooperated[]> => {return [new Cooperated()]})

  findOne = jest.fn(async (
    _fields: EntityCondition<Cooperated>,
  ): Promise<NullableType<Cooperated>> => {return new Cooperated() })

  update = jest.fn(async (
    _id: Cooperated['id'],
    _payload: DeepPartial<Cooperated>,
  ): Promise<Cooperated> => { return new Cooperated()})

  softDelete = jest.fn(async (id: Cooperated['id']): Promise<void> => {})
}


const jwtService = new JwtService();
const usersServiceMocked = new UsersServiceMocked();
const forgotServiceMocked = new ForgotServiceMocked();
const sessionServiceMocked = new SessionServiceMocked();
const mailServiceMocked = new MailServiceMocked();
const configService = new ConfigService<AllConfigType>();
const cooperatedServiceMocked= new CooperatedServiceMocked()

let controller: AuthController = new AuthController(
  new AuthService( jwtService, usersServiceMocked as any, forgotServiceMocked as any, sessionServiceMocked as any, mailServiceMocked as any, configService, cooperatedServiceMocked as any),
);
describe("TestingController", () => {

  beforeEach(async () => {
    jest.clearAllMocks()
  });

  beforeAll(async () => {
    jest.clearAllMocks()
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("success cases", () => {
    // it("should do login correctly", async () => {
    //   user.role = undefined;
    //   user.provider = "email";
    //   usersServiceMocked.findOne.mockResolvedValueOnce(user);
    //   const res = await controller.login({
    //     email: "test@example.com",
    //     password: "password123",
    //   });
    //   console.log(res);

    //   expect(res).toBeDefined();
    //   expect(res).toHaveProperty("token");
    //   expect(res).toHaveProperty("refreshToken");
    //   expect(res).toHaveProperty("tokenExpires");
    // });

    it("should validate document correctly if exists", async () => {
      const document = "21668658011"

      const spy_cooperatedService_findOne = jest.spyOn(cooperatedServiceMocked,"findOne")
      const response = await controller.validateDocument({document})
      expect(spy_cooperatedService_findOne).toHaveBeenCalledTimes(1)
      expect(spy_cooperatedService_findOne).toHaveBeenCalledWith({ document: document.replace(/[^0-9]/g, "") })
      expect(spy_cooperatedService_findOne).toHaveReturned()
      expect(response).toHaveProperty('name')
      expect(response).toHaveProperty('document')
    })

    it("should execute soft delete without erro", async () => {

      const spy_usersServiceMocked_softDelete = jest.spyOn(usersServiceMocked,"softDelete")
      const response = await controller.delete({user: user.toJSON()})
      expect(spy_usersServiceMocked_softDelete).toHaveBeenCalledTimes(1)
      expect(spy_usersServiceMocked_softDelete).toHaveBeenCalledWith(user.id)
    
      expect(response).toBeUndefined()
    })

    it("should execute update without erro (without password)", async () => {

      const spy_usersServiceMocked_update = jest.spyOn(usersServiceMocked,"update")
      const spy_usersServiceMocked_findOne = jest.spyOn(usersServiceMocked,"findOne")
      const spy_sessionServiceMocked_softDelete = jest.spyOn(sessionServiceMocked,"softDelete")

      const userUpdate = {
        firstName: 'firstName',
        lastName: 'lastName',
        oldPassword: user.password
      }

      const response = await controller.update({user: user.toJSON()},userUpdate)

      expect(spy_usersServiceMocked_update).toHaveBeenCalledTimes(1)
      expect(spy_usersServiceMocked_findOne).toHaveBeenCalledTimes(1)
      expect(spy_sessionServiceMocked_softDelete).toHaveBeenCalledTimes(0)
      expect(spy_usersServiceMocked_update).toHaveBeenCalledWith(user.id, userUpdate)
    
      expect(response).toBeDefined()
      expect(response).toBeInstanceOf(User)
    })


    it("should execute update without erro (with the same old password)", async () => {

      usersServiceMocked.findOne.mockResolvedValueOnce(user)

      const spy_usersServiceMocked_update = jest.spyOn(usersServiceMocked,"update")
      const spy_usersServiceMocked_findOne = jest.spyOn(usersServiceMocked,"findOne")
      const spy_sessionServiceMocked_softDelete = jest.spyOn(sessionServiceMocked,"softDelete")
      const userUpdate = {
        firstName: 'firstName',
        lastName: 'lastName',
        oldPassword: 'password123',
        password:  'password123'
      }

      user.password = "$2a$10$yJyGsexHRWW37yGtCFMSR.Y4kL7QcX8Eyl7Kam8E1L3fkxvFrHhE2"

      const response = await controller.update({user: user},userUpdate)
      expect(spy_usersServiceMocked_update).toHaveBeenCalledTimes(1)
      expect(spy_usersServiceMocked_findOne).toHaveBeenCalledTimes(2)
      expect(spy_sessionServiceMocked_softDelete).toHaveBeenCalledTimes(1)
      expect(spy_usersServiceMocked_update).toHaveBeenCalledWith(user.id, userUpdate)

      console.log('response', response)
    
      expect(response).toBeDefined()
      expect(response).toBeInstanceOf(User)
    })

    it("should execute logout without erro", async () => {
      const spy_sessionServiceMocked_softDelete = jest.spyOn(sessionServiceMocked,"softDelete")
      
      const response = await controller.logout({user: {sessionId: session.id}})
      expect(spy_sessionServiceMocked_softDelete).toHaveBeenCalledTimes(1)
      expect(spy_sessionServiceMocked_softDelete).toHaveBeenCalledWith({id: session.id})

      expect(response).toBeUndefined()
    })

    // it("should execute refreshToken without erro", async () => {
    //   sessionServiceMocked.findOne.mockResolvedValueOnce(session)
    //   const spy_sessionServiceMocked_findOne = jest.spyOn(sessionServiceMocked,"findOne")
      
    //   const response = await controller.refresh({user: {sessionId: session.id}})
    //   expect(spy_sessionServiceMocked_findOne).toHaveBeenCalledTimes(1)
    //   expect(spy_sessionServiceMocked_findOne).toHaveBeenCalledWith({id: session.id})

    //   expect(response).toHaveProperty("token")
    //   expect(response).toHaveProperty("refreshToken")
    //   expect(response).toHaveProperty("tokenExpires")
    //   expect(response).toHaveProperty("user")
    // })

    it("should execute me correctly", async () => {
      sessionServiceMocked.findOne.mockResolvedValueOnce(session)
      const response = await controller.me({user: user})
      expect(response).toBeDefined()
    })

    // it("should execute resetPassword correctly", async () => {

    //   forgotServiceMocked.findOne.mockResolvedValueOnce(forgot)
      
    //   const spy_forgotServiceMocked_findOne = jest.spyOn(forgotServiceMocked,"findOne")
    //   const spy_forgotServiceMocked_softDelete = jest.spyOn(forgotServiceMocked,"softDelete")


    //   const hash = 'hash'
    //   const response = await controller.resetPassword({
    //     hash: hash,
    //     password: user.password
    //   })

    //   expect(response).toBeUndefined()
    //   expect(spy_forgotServiceMocked_findOne).toHaveBeenCalledTimes(1)
    //   expect(spy_forgotServiceMocked_findOne).toHaveBeenCalledWith({hash: hash})

    //   expect(spy_forgotServiceMocked_softDelete).toHaveBeenCalledTimes(1)
    //   expect(spy_forgotServiceMocked_softDelete).toHaveBeenCalledWith(forgot.id)
    // })


    it("should execute forgotPassword correctly", async () => {

      usersServiceMocked.findOne.mockResolvedValueOnce(user)
      forgotServiceMocked.create.mockResolvedValueOnce(forgot)

      const spy_usersServiceMocked_findOne = jest.spyOn(usersServiceMocked,"findOne")
      const spy_forgotServiceMocked_create = jest.spyOn(forgotServiceMocked,"create")
      const spy_mailServiceMocked_forgotPassword = jest.spyOn(mailServiceMocked,"forgotPassword")

      const input = {email: "test@example.com"}
      const response = await controller.forgotPassword(input)

      expect(response).toBeUndefined()
      expect(spy_usersServiceMocked_findOne).toHaveBeenCalledTimes(1)
      expect(spy_usersServiceMocked_findOne).toHaveBeenCalledWith({email: input.email})

      expect(spy_forgotServiceMocked_create).toHaveBeenCalledTimes(1)
      expect(spy_mailServiceMocked_forgotPassword).toHaveBeenCalledTimes(1)
    })

    // it("should execute confirmEmail correctly", async () => {
    //   //Revalidate
    // })

    // it("should execute confirmEmail correctly", async () => {
    //   //register
    // })
  });
});
