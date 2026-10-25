import { PHONES } from "../data/phones";
import type { Phone } from "../types";

const DEFAULT_API_URL =
  "https://6addcb9f4e88f1bba4a4ace7.mockapi.io/phones";
const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL
).replace(/\/$/, "");

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export async function fetchPhone(id: string): Promise<Phone> {
  if (!API_URL) {
    await delay(600);
    const phone = PHONES.find((item) => item.id === id);
    if (!phone) {
      throw new Error(`Không tìm thấy sản phẩm có mã ${id}.`);
    }
    return phone;
  }

  const phoneUrl = API_URL.endsWith("/phones")
    ? `${API_URL}/${id}`
    : `${API_URL}/phones/${id}`;
  let response = await fetch(phoneUrl);

  if (!response.ok && response.status === 404 && API_URL.endsWith("/phones")) {
    response = await fetch(API_URL);
    if (response.ok) {
      const phones = (await response.json()) as Phone[];
      const index = Number.parseInt(id, 10) - 1;
      const phone = phones.find((item) => item.id === id) ?? phones[index];
      if (phone) {
        return { ...phone, id: phone.id ?? id };
      }
    }
  }

  if (!response.ok) {
    throw new Error(`Không thể tải sản phẩm (HTTP ${response.status}).`);
  }

  return (await response.json()) as Phone;
}
