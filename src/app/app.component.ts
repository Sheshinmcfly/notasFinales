import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Ramo {
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number | string;
  promedio: number | string;
}

interface Resultado {
  nombre: string;
  carrera: string;
  ramos: Ramo[];
  notaNecesaria: number;
  ramoTres: string;
  notaAprobacionCarrera: number;
  yaReprobado: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  form: FormGroup;
  resultado: Resultado | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:         ['', Validators.required],
      carrera:        ['', Validators.required],
      ramo1:          ['', Validators.required],
      nota1_r1:       [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      nota2_r1:       [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      nota3_r1:       [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      ramo2:          ['', Validators.required],
      nota1_r2:       [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      nota2_r2:       [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      nota3_r2:       [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      ramo3:                 ['', Validators.required],
      nota1_r3:              [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      nota2_r3:              [null, [Validators.required, Validators.min(1), Validators.max(7)]],
      notaAprobacionCarrera: [4.0, [Validators.required, Validators.min(1), Validators.max(7)]],
    });
  }

  private round(n: number): number {
    return Math.round(n * 10) / 10;
  }

  calcular(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const v = this.form.value;
    const round = (n: number) => this.round(n);
    const promedio = (a: number, b: number, c: number) => round((a + b + c) / 3);

    const prom_r1 = promedio(v.nota1_r1, v.nota2_r1, v.nota3_r1);
    const prom_r2 = promedio(v.nota1_r2, v.nota2_r2, v.nota3_r2);

    // Para que el promedio general sea notaAprobacionCarrera:
    // notaAprobacionCarrera = (prom_r1 + prom_r2 + prom_r3) / 3
    // prom_r3 necesario = notaAprobacionCarrera * 3 - prom_r1 - prom_r2
    // nota3_r3 necesaria = prom_r3 * 3 - nota1_r3 - nota2_r3
    const prom_r3_necesario = round(v.notaAprobacionCarrera * 3 - prom_r1 - prom_r2);
    const notaNecesaria     = round(prom_r3_necesario * 3 - v.nota1_r3 - v.nota2_r3);
    const yaReprobado       = notaNecesaria > 7.0;

    this.resultado = {
      nombre:  v.nombre,
      carrera: v.carrera,
      ramoTres: v.ramo3,
      notaAprobacionCarrera: v.notaAprobacionCarrera,
      notaNecesaria,
      yaReprobado,
      ramos: [
        { nombre: v.ramo1, nota1: v.nota1_r1, nota2: v.nota2_r1, nota3: v.nota3_r1, promedio: prom_r1 },
        { nombre: v.ramo2, nota1: v.nota1_r2, nota2: v.nota2_r2, nota3: v.nota3_r2, promedio: prom_r2 },
        { nombre: v.ramo3, nota1: v.nota1_r3, nota2: v.nota2_r3, nota3: '-',        promedio: '-'     },
      ],
    };
  }

  limpiar(): void {
    this.form.reset();
    this.resultado = null;
  }

  isInvalid(campo: string): boolean {
    const c = this.form.get(campo);
    return !!(c && c.invalid && c.touched);
  }
}
