import { Button } from "@mui/material";

export default function SubmitButtons() {
  return (
    <div>
      <Button
        type="button"
        variant="contained"
        className="ptcgp-trade_submit-button"
      >
        Ver intercambios disponibles
      </Button>
      <Button
        type="button"
        variant="contained"
        className="ptcgp-trade_submit-button"
        style={{ display: "flex", marginTop: "10px" }}
      >
        Añadir un nuevo intercambio
      </Button>
    </div>
  );
}
