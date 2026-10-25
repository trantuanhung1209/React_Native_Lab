import React, { useEffect, useState } from "react";
import { ErrorBox } from "../components/ErrorBox";
import { Loading } from "../components/Loading";
import { fetchPhone } from "../api/phoneApi";
import type { Phone } from "../types";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    setPhone(null);
    try {
      setPhone(await fetchPhone("1"));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi.");
    }
  };

  useEffect(() => {
    void load();
  }, []);

  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }
  if (!phone) {
    return <Loading />;
  }
  return <SelectPhoneApp phone={phone} />;
}
