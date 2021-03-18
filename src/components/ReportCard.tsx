import React, { useState } from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonSearchbar,
  IonLabel,
  IonImg,
} from "@ionic/react";

import { fetchWeather } from "../api/fetchWeather";

import "./ReportCard.css";

export const ReportCard = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    id: 0,
    main: { temp: 0.0 },
    sys: { country: "" },
    name: "",
    icon: "",
    weather: [{ icon: "", description: "" }],
  });

  const search = async (e: any) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
    }
  };
  return (
    <>
      {weather.id && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{weather.name}</IonCardTitle>
            <IonCardSubtitle>{weather.sys.country}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonLabel color="primary" className="temp_label">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </IonLabel>
            <IonImg
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <IonLabel className="desc_label">
              {weather.weather[0].description}
            </IonLabel>
          </IonCardContent>
        </IonCard>
      )}

      <IonSearchbar
        value={query}
        onIonChange={(e) => setQuery(e.detail.value!)}
        placeholder="enter location"
        onKeyPress={search}
      />
    </>
  );
};
