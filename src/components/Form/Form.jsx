import React, { useCallback, useEffect, useState } from "react";
import "../Form/Form.css";
import { useTelegram } from "../../hooks/useTelegram";
const Form = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, city, subject]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  });
  useEffect(() => {
    if (!country || !city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, city]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  return (
    <div className={"form"}>
      <h3>Введите ваши данные</h3>
      <input
        value={country}
        onChange={onChangeCountry}
        className={"input"}
        type="text"
        placeholder={"Страна"}
      />
      <input
        value={city}
        onChange={onChangeCity}
        className={"input"}
        type="text"
        placeholder={"Город"}
      />

      <select className={"select"} value={subject} onChange={onChangeSubject}>
        <option value={"physical"}>Физ.лицо</option>
        <option value={"legal"}>Юр.лицо</option>
      </select>
    </div>
  );
};

export default Form;
