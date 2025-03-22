export class RegistroMulta {
  constructor(
    public id: number,
    public multaId: number,
    public usuarioMultadoId: number,
    public usuarioAutorId: number,
    public descripcion: string,
    public aprobaciones: number = 0,
    public aprobado: boolean = false,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
