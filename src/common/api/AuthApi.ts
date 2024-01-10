import { instance } from "common/api/instance";
import { AxiosResponse } from "axios";
import { Params, ResponseType } from "common/api/types";

export const AuthApi = {
  authMe(data: Params) {
    return instance.post<
      ResponseType<{ userId?: number }>,
      AxiosResponse<ResponseType<{ userId?: number }>>,
      Params
    >("auth/login", data);
  },
  me() {
    return instance.get<
      ResponseType<{ id: number; email: string; login: string }>
    >("auth/me");
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};
