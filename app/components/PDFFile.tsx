import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Canvas,
} from "@react-pdf/renderer";
import { Database } from "@/utils/database.types";

// Register font
Font.register({
  family: "Rubik",

  fonts: [
    {
      src: "/fonts/Rubik-Regular.ttf",
    },
    {
      src: "/fonts/Rubik-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    color: "#000",
    width: "100%",
    gap: 4,
    fontFamily: "Rubik",
  },
  section: {
    padding: 20,
    //paddingHorizontal: 20,
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  h2: {
    fontSize: 15,
    fontFamily: "Rubik",
    fontWeight: "bold",
  },
  h3: {
    fontSize: 14,
    fontFamily: "Rubik",
    fontWeight: "bold",
  },
  text: {
    fontSize: 10,
    fontFamily: "Rubik",
  },
  secondaryText: {
    fontSize: 10,
    color: "#929292",
    fontFamily: "Rubik",
  },
  infoblock: {
    display: "flex",
    flexDirection: "row",
    // flexGrow: 1,
    width: "100%",
  },
  itemblock: { display: "flex", flexDirection: "column", width: "100%" },
  table: { display: "flex", flexDirection: "column", width: "100%" },
  tableRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 16,
    fontSize: 10,
    borderBottom: "0.5px solid #929292",
    padding: 8,
  },
  firstHeaderItem: { width: "40%", fontWeight: "bold" },
  secondHeaderItem: { width: "10%", fontWeight: "bold" },
  thirdHeaderItem: { width: "50%", fontWeight: "bold" },
  firstItem: { width: "40%" },
  secondItem: { width: "10%" },
  thirdItem: { width: "50%" },
});

type ProjectProps = Database["public"]["Tables"]["projects"]["Row"];
type RoomProps = Database["public"]["Tables"]["rooms"]["Row"];

export interface PDFProps {
  project: ProjectProps;
  rooms: RoomProps[];
}

function PDFPage({ project, rooms }: PDFProps) {
  return (
    <Document
      author="Controla"
      title={`${project.id} brief`}
      language="ru"
      // pageMode="useOutlines"
      // pageLayout="singlePage"
    >
      <Page size="A4" orientation="portrait" wrap={true} style={styles.page}>
        <View style={styles.section}>
          <View style={styles.itemblock}>
            <Text style={styles.h2}>Техническое задание</Text>
            <Text style={styles.secondaryText}>
              Приложение к договору №{project.contractId}
            </Text>
          </View>
        </View>
        {/* //! SECTION Информация о клиенте */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.h3}>Информация о клиенте</Text>

          <View style={styles.infoblock}>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>ФИО</Text>
              <Text style={styles.text}>Шмфтщм Шмфт</Text>
            </View>

            <View style={styles.infoblock}>
              <View style={styles.itemblock}>
                <Text style={styles.secondaryText}>Телефон</Text>
                <Text style={styles.text}>Телефон</Text>
              </View>
              <View style={styles.itemblock}>
                <Text style={styles.secondaryText}>Эл. почта</Text>
                <Text style={styles.text}>Эл. почта</Text>
              </View>
            </View>
          </View>
        </View>

        {/* //! SECTION Общая информация */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.h3}>Общая информация</Text>
          <View style={styles.infoblock}>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>Адрес</Text>
              <Text style={styles.text}>{project.address}</Text>
            </View>
            <View style={styles.itemblock}>
              <Text
                style={styles.secondaryText}
              >{`Бюджет (ориентировочный)`}</Text>
              <Text style={styles.text}>
                {project.approxBudget?.[0].toLocaleString("ru-RU", {
                  currency: "RUB",
                  style: "currency",
                  maximumFractionDigits: 0,
                  useGrouping: true,
                  notation: "compact",
                })}{" "}
                -{" "}
                {project.approxBudget?.[1].toLocaleString("ru-RU", {
                  currency: "RUB",
                  style: "currency",
                  maximumFractionDigits: 0,
                  useGrouping: true,
                  notation: "compact",
                })}
              </Text>
            </View>
          </View>

          <View style={styles.infoblock}>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>Площадь объекта</Text>
              <Text style={styles.text}>{project.area} кв.м.</Text>
            </View>
            <View style={styles.infoblock}>
              <View style={styles.itemblock}>
                <Text style={styles.secondaryText}>Этажность</Text>
                <Text style={styles.text}>{project.floorsNumber} эт.</Text>
              </View>
              <View style={styles.itemblock}>
                <Text style={styles.secondaryText}>Назначение объекта</Text>
                <Text style={styles.text}>{project.purpose}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoblock}>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>
                Единовременно проживающих
              </Text>
              <Text style={styles.text}>
                {(project.residing ?? 1) + project.children} ч
              </Text>
            </View>
            <View style={styles.infoblock}>
              <View style={styles.itemblock}>
                <Text style={styles.secondaryText}>Взрослые</Text>
                <Text style={styles.text}>{project.residing} ч</Text>
              </View>
              <View style={styles.itemblock}>
                <Text style={styles.secondaryText}>Дети</Text>
                <Text style={styles.text}>{project.children} ч</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoblock}>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>Домашние животные</Text>
              <Text style={styles.text}>{project.pets || "-"}</Text>
            </View>
            <View style={styles.infoblock}>
              <View style={styles.itemblock}>
                <Text style={styles.secondaryText}>
                  Предусмотреть для животных
                </Text>
                <Text style={styles.text}>{project.pets || "-"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoblock}>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>Увлечения</Text>
              <Text style={styles.text}>{project.hobbies || "-"}</Text>
            </View>
            <View style={styles.infoblock}>
              <View style={styles.itemblock}>
                <Text style={styles.secondaryText}>Особенности здоровья</Text>
                <Text style={styles.text}>{project.healthFeatures || "-"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* //! SECTION Состав помещений */}
        <View style={styles.section}>
          <Text style={styles.h3}>Состав помещений</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.firstHeaderItem}>Наименование</Text>
              <Text style={styles.secondHeaderItem}>Площадь</Text>
              <Text style={styles.thirdHeaderItem}>Наполнение</Text>
            </View>
            {rooms ? (
              rooms.map((room, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.firstItem}>{room.name}</Text>
                  <Text style={styles.secondItem}>{room.area}</Text>
                  <Text style={styles.thirdItem}>{room.id}</Text>
                </View>
              ))
            ) : (
              <></>
            )}
          </View>
        </View>

        {/* //! SECTION Информация по демонтажу */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.h3}>Информация по демонтажу</Text>

          <View style={styles.infoblock}>
            <Text style={styles.text}>
              {project.planChange && "Демонтаж перегородок"}
            </Text>
            <Text style={styles.text}>
              {project.entranceDoorChange && "Демонтаж входной двери"}
            </Text>
            <Text style={styles.text}>
              {project.windowsChange && "Демонтаж окон"}
            </Text>
            <Text style={styles.text}>
              {project.furnitureDemolition && "Демонтаж встроенной мебели"}
            </Text>
          </View>
        </View>
        {/* //! SECTION Информация по монтажу */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.h3}>Информация по монтажу</Text>

          <View style={styles.infoblock}>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>Материал перегородок</Text>
              <Text style={styles.text}>
                {project.wallsMaterial.join(", ")}
              </Text>
            </View>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>Материал потолка</Text>
              <Text style={styles.text}>
                {project.ceilingMaterial.join(", ")}
              </Text>
            </View>
          </View>
          <View style={styles.infoblock}>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>
                Материал напольного покрытия
              </Text>
              <Text style={styles.text}>
                {project.floorMaterial.join(", ")}
              </Text>
            </View>
            <View style={styles.itemblock}>
              <Text style={styles.secondaryText}>
                Высота межкомнатных дверей
              </Text>
              <Text style={styles.text}>{project.innerDoorsHeight} мм</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDFPage;
