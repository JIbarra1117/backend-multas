export interface HistorialMulta {
  id: number;
  descripcion: string;
  fecha_aplicacion: Date;
  aprobaciones: number;
  aprobado: boolean;
  usuarioMultado: {
    id: number;
    nombre: string;
  };
  usuarioAutor: {
    id: number;
    nombre: string;
  };
  tipoMulta: {
    id: number;
    descripcion: string;
  };
}
