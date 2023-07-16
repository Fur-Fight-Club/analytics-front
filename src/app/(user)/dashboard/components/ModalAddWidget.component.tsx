"use client";

import { db } from "@/firebase";
import { Widget, WidgetType } from "@/types/widget.type";
import { Modal, Button, Spacer, Text, Radio, Input } from "@nextui-org/react";
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

  const renderDoughnutOptions = () => (
    <>
      <Text h4>Paramètrer le graphique doughnut</Text>
    </>
  );

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

  const renderLineOptions = () => (
    <>
      <Text h4>Paramètrer le graphique en ligne</Text>
    </>
  );

  const renderTableOptions = () => (
    <>
      <Text h4>Paramètrer la table de données</Text>
    </>
  );

  const handleCloseModal = () => {
    setWidgetType(WidgetType.DOUGHNUT);
    handleClose();

    // Clean HEATMAP options
    setPageHeatmap("");
    setImageHeatmap("");
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
          <Radio value={WidgetType.HEATMAP}>Heatmap</Radio>
          <Radio value={WidgetType.LINE}>Graphique en ligne</Radio>
          <Radio value={WidgetType.TABLE}>Table de données</Radio>
        </Radio.Group>
        <Spacer y={0.5} />
        {widgetType === WidgetType.HEATMAP && renderHeatmapOptions()}
        {widgetType === WidgetType.DOUGHNUT && renderDoughnutOptions()}
        {widgetType === WidgetType.LINE && renderLineOptions()}
        {widgetType === WidgetType.TABLE && renderTableOptions()}
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
              : () => console.log("IMPLEMENT ME")
          }
        >
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
