import { forceSignOut } from "@/lib/utils"
import camelcaseKeys from "camelcase-keys"
import ky from "ky"

const kyDefault = ky.create({
  mode: "cors",
  timeout: 600_000, // 1 minutes
  parseJson(text) {
    return camelcaseKeys(JSON.parse(text), { deep: true })
  },
})

function isValueRecord(value: unknown): value is Record<string, unknown> {
  if (!value) return false
  return typeof value === "object" && Object.keys(value).length > 0
}

const kyInstance = kyDefault.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        if (!["POST", "PUT"].includes(request.method)) return request
        try {
          const json = await request.clone().json()
          if (!isValueRecord(json)) return request
          const camelcase = JSON.stringify(camelcaseKeys(json, { deep: true }))
          return new Request(request, {
            body: camelcase,
          })
        } catch (_error) {
          return request
        }
      },
    ],
    afterResponse: [
      (_request, _option, response) => {
        // 401: Unauthorized
        if (response.status === 401) {
          console.error("Session expired, please login again");
          forceSignOut();
        }
        return response
      },
    ],
  }
})

export default kyInstance