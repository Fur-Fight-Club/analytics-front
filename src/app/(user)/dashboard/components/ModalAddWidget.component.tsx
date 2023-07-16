"use client";

import { db } from "@/firebase";
import {
  DoughnutStat,
  LineStat,
  TableStat,
  WatchedStat,
  Widget,
  WidgetType,
} from "@/types/widget.type";
import { Modal, Button, Spacer, Text, Radio, Input } from "@nextui-org/react";
import { Select } from "antd";
import * as React from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface ModalAddWidgetProps {
  visible: boolean;
  handleClose: () => void;
  onValidate: () => void;
  appId: string;
  widgetLength?: number;
}

export const ModalAddWidget: React.FunctionComponent<ModalAddWidgetProps> = ({
  visible,
  handleClose,
  onValidate,
  appId,
  widgetLength,
}) => {
  const [widgetType, setWidgetType] = React.useState(WidgetType.DOUGHNUT);

  const [pageHeatmap, setPageHeatmap] = React.useState<string>("");
  const [imageHeatmap, setImageHeatmap] = React.useState<string>("");
  const renderHeatmapOptions = () => (
    <>
      <Text h4>Paramètrer la heatmap</Text>
      <Input
        label="Page à monitorer"
        placeholder="/my/page"
        fullWidth
        value={pageHeatmap}
        onChange={(e) => setPageHeatmap(e.target.value)}
        size="lg"
      />
      <Input
        label={"Lien vers l'image de la heatmap"}
        placeholder="https://my-site/public/my-image.png"
        fullWidth
        value={imageHeatmap}
        onChange={(e) => setImageHeatmap(e.target.value)}
        size="lg"
      />
    </>
  );
  const handleAddHeatmapWidget = () => {
    if (!pageHeatmap || !imageHeatmap) {
      toast.error("Veuillez remplir tous les champs");
    } else {
      db.widgets
        .create({
          id: uuidv4(),
          type: WidgetType.HEATMAP,
          appId,
          page: pageHeatmap,
          pagePicture: imageHeatmap,
          position: widgetLength ? widgetLength : 0,
        })
        .then(() => {
          handleCloseModal();
          onValidate();
        });
    }
  };

  const [kpiText, setKpiText] = React.useState<string>("");
  const [kpiUnit, setKpiUnit] = React.useState<string>("");
  const [kpiWatchedStat, setKpiWatchedStat] = React.useState<string>("");
  const renderKpiOptions = () => (
    <>
      <Text h4>Paramètrer la carte de statistiques</Text>
      <Input
        label="Texte du KPI"
        placeholder="Nombre de visites"
        fullWidth
        value={kpiText}
        onChange={(e) => setKpiText(e.target.value)}
        size="lg"
      />
      <Input
        label="Unité du KPI"
        placeholder="visites"
        fullWidth
        value={kpiUnit}
        onChange={(e) => setKpiUnit(e.target.value)}
        size="lg"
      />
      <Text>Statistique à surveiller</Text>
      <Select
        defaultValue={WatchedStat.BUTTON_CLICKS}
        style={{ width: "100%" }}
        onChange={(value) => setKpiWatchedStat(value)}
        dropdownStyle={{ zIndex: 9999 }}
        value={kpiWatchedStat}
        options={[
          { label: "Clics de boutons", value: WatchedStat.BUTTON_CLICKS },
          { label: "Clics de souris", value: WatchedStat.MOUSE_CLICKS },
          { label: "Changement de routes", value: WatchedStat.ROUTE_CHANGE },
          { label: "Fermeture d'app", value: WatchedStat.APP_CLOSE },
          { label: "Visiteurs uniques", value: WatchedStat.UNIQUE_VISITORS },
          { label: "Taux de rebond", value: WatchedStat.DEBOUNCE_RATE },
          {
            label: "Moyenne de page visitées",
            value: WatchedStat.AVERAGE_PAGE_VISITS,
          },
          {
            label: "Temps moyen de session",
            value: WatchedStat.AVERAGE_SESSION_DURATION,
          },
        ]}
      />
    </>
  );
  const handleAddKpiWidget = () => {
    if (!kpiText || !kpiWatchedStat) {
      toast.error("Veuillez remplir tous les champs");
    } else {
      db.widgets
        .create({
          id: uuidv4(),
          type: WidgetType.KPI,
          appId,
          text: kpiText,
          unit: kpiUnit,
          watchedStat: kpiWatchedStat as WatchedStat,
          position: widgetLength ? widgetLength : 0,
        })
        .then(() => {
          handleCloseModal();
          onValidate();
        });
    }
  };

  const [doughnutName, setDoughnutName] = React.useState<string>("");
  const [doughnutStat, setDoughnutStat] = React.useState<DoughnutStat>(
    DoughnutStat.AVERAGE_TIME_SPENT
  );
  const renderDoughnutOptions = () => (
    <>
      <Text h4>Paramètrer le graphique doughnut</Text>
      <Text>Statistique à surveiller</Text>
      <Select
        defaultValue={DoughnutStat.AVERAGE_TIME_SPENT}
        style={{ width: "100%" }}
        onChange={(value) => setDoughnutStat(value)}
        dropdownStyle={{ zIndex: 9999 }}
        value={doughnutStat}
        options={[
          {
            label: "Temps moyen passé par pages",
            value: DoughnutStat.AVERAGE_TIME_SPENT,
          },
          {
            label: "Proportion des plateformes",
            value: DoughnutStat.PLATFORMS_PROPORTIONS,
          },
          {
            label: "Proportion des navigateurs",
            value: DoughnutStat.BROWSERS_PROPORTIONS,
          },
          {
            label: "Proportion des langues",
            value: DoughnutStat.LANGUAGES_PROPORTIONS,
          },
          {
            label: "Proportion des pays",
            value: DoughnutStat.COUNTRIES_PROPORTIONS,
          },
          {
            label: "Proportion des fournisseurs d'accès internet",
            value: DoughnutStat.INTERNET_PROVIDERS_PROPORTIONS,
          },
        ]}
      />

      <Input
        label="Nom du graphique"
        placeholder="Temps moyen passé sur le site"
        fullWidth
        value={doughnutName}
        onChange={(e) => setDoughnutName(e.target.value)}
        size="lg"
      />
    </>
  );
  const handleAddDoughnutWidget = () => {
    if (!doughnutName || !doughnutStat) {
      toast.error("Veuillez remplir tous les champs");
    } else {
      db.widgets
        .create({
          id: uuidv4(),
          type: WidgetType.DOUGHNUT,
          appId,
          doughnutStat: doughnutStat as DoughnutStat,
          position: widgetLength ? widgetLength : 0,
          chartName: doughnutName,
        })
        .then(() => {
          handleCloseModal();
          onValidate();
        });
    }
  };

  const [lineStat, setLineStat] = React.useState<LineStat>(LineStat.VISITS);
  const [lineName, setLineName] = React.useState<string>("");
  const [lineDays, setLineDays] = React.useState<number>(7);
  const renderLineOptions = () => (
    <>
      <Text h4>Paramètrer le graphique en ligne</Text>
      <Text>Statistique à surveiller</Text>
      <Select
        defaultValue={LineStat.VISITS}
        style={{ width: "100%" }}
        onChange={(value) => setLineStat(value as LineStat)}
        dropdownStyle={{ zIndex: 9999 }}
        value={lineStat}
        options={[
          { label: "Nombre de visites par jours", value: LineStat.VISITS },
        ]}
      />
      <Input
        label="Nom du graphique"
        placeholder="Nombre de visites"
        fullWidth
        value={lineName}
        onChange={(e) => setLineName(e.target.value)}
        size="lg"
      />
      <Input
        label="Nombre de jours"
        placeholder="7"
        fullWidth
        value={lineDays}
        onChange={(e) => setLineDays(+e.target.value)}
        size="lg"
      />
    </>
  );
  const handleAddLineWidget = () => {
    if (!lineName || !lineDays || !lineStat) {
      toast.error("Veuillez remplir tous les champs");
    } else {
      db.widgets
        .create({
          id: uuidv4(),
          type: WidgetType.LINE,
          appId,
          chartName: lineName,
          days: lineDays,
          lineStat: lineStat as LineStat,
          position: widgetLength ? widgetLength : 0,
        })
        .then(() => {
          handleCloseModal();
          onValidate();
        });
    }
  };

  const [tableStat, setTableStat] = React.useState<TableStat>(
    TableStat.AVERAGE_TIME_SPENT
  );
  const renderTableOptions = () => (
    <>
      <Text h4>Paramètrer la table de données</Text>
      <Text>Statistique à surveiller</Text>
      <Select
        defaultValue={TableStat.AVERAGE_TIME_SPENT}
        style={{ width: "100%" }}
        onChange={(value) => setTableStat(value as TableStat)}
        dropdownStyle={{ zIndex: 9999 }}
        value={tableStat}
        options={[
          {
            label: "Temps moyen passé par pages",
            value: TableStat.AVERAGE_TIME_SPENT,
          },
          {
            label: "Clics sur les boutons",
            value: TableStat.UNIQUE_BUTTON_CLICKS,
          },
        ]}
      />
    </>
  );
  const handleAddTableWidget = () => {
    if (!tableStat) {
      toast.error("Veuillez remplir tous les champs");
    } else {
      db.widgets
        .create({
          id: uuidv4(),
          type: WidgetType.TABLE,
          appId,
          tableStat: tableStat as TableStat,
          position: widgetLength ? widgetLength : 0,
        })
        .then(() => {
          handleCloseModal();
          onValidate();
        });
    }
  };

  const handleCloseModal = () => {
    setWidgetType(WidgetType.DOUGHNUT);
    handleClose();

    // Clean HEATMAP options
    setPageHeatmap("");
    setImageHeatmap("");

    // Clean KPI options
    setKpiText("");
    setKpiUnit("");
    setKpiWatchedStat(WatchedStat.BUTTON_CLICKS);

    // Clean LINE options
    setLineStat(LineStat.VISITS);
    setLineName("");
    setLineDays(7);

    // Clean DOUGHNUT options
    setDoughnutName("");
    setDoughnutStat(DoughnutStat.AVERAGE_TIME_SPENT);

    // Clean TABLE options
    setTableStat(TableStat.AVERAGE_TIME_SPENT);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={() => handleCloseModal()}
      width={"40%"}
    >
      <Modal.Header>
        <Text b id="modal-title" size={18}>
          Ajouter un widget
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Radio.Group
          label="Type de widget"
          defaultValue={WidgetType.DOUGHNUT}
          onChange={(value: string) => setWidgetType(value as WidgetType)}
        >
          <Radio value={WidgetType.DOUGHNUT}>Graphique doughnut</Radio>
          <Radio value={WidgetType.LINE}>Graphique en ligne</Radio>
          <Radio value={WidgetType.HEATMAP}>Heatmap</Radio>
          <Radio value={WidgetType.TABLE}>Table de données</Radio>
          <Radio value={WidgetType.KPI}>Carte de statistiques</Radio>
        </Radio.Group>
        <Spacer y={0.5} />
        {widgetType === WidgetType.HEATMAP && renderHeatmapOptions()}
        {widgetType === WidgetType.DOUGHNUT && renderDoughnutOptions()}
        {widgetType === WidgetType.LINE && renderLineOptions()}
        {widgetType === WidgetType.TABLE && renderTableOptions()}
        {widgetType === WidgetType.KPI && renderKpiOptions()}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => handleCloseModal()}>
          Annuler
        </Button>
        <Spacer x={0.5} />
        <Button
          auto
          onPress={() =>
            widgetType === WidgetType.HEATMAP
              ? handleAddHeatmapWidget()
              : widgetType === WidgetType.KPI
              ? handleAddKpiWidget()
              : widgetType === WidgetType.LINE
              ? handleAddLineWidget()
              : widgetType === WidgetType.DOUGHNUT
              ? handleAddDoughnutWidget()
              : widgetType === WidgetType.TABLE
              ? handleAddTableWidget()
              : () => toast.error("Veuillez choisir un type de widget")
          }
        >
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
