import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

const fillForm = (app: AppComponent, overrides: Record<string, any> = {}) => {
  app.form.patchValue({
    nombre: 'Sergio Palacios',
    carrera: 'Ingeniería Informática',
    ramo1: 'Matemáticas',
    nota1_r1: 5, nota2_r1: 6, nota3_r1: 4,
    ramo2: 'Programación',
    nota1_r2: 6, nota2_r2: 5, nota3_r2: 6,
    ramo3: 'Base de Datos',
    nota1_r3: 4, nota2_r3: 4,
    notaAprobacionCarrera: 4.0,
    ...overrides,
  });
};

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe iniciar sin resultado', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.resultado).toBeNull();
  });

  it('no debe calcular si el formulario está incompleto', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.calcular();
    expect(app.resultado).toBeNull();
  });

  it('debe calcular la nota necesaria correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // prom_r1 = (5+6+4)/3 = 5
    // prom_r2 = (6+5+6)/3 = 5.7
    // prom_r3_necesario = 4*3 - 5 - 5.7 = 1.3
    // nota3_necesaria = 1.3*3 - 4 - 4 = -4.1 → el número puede variar por redondeo
    // Usamos un caso más claro:
    fillForm(app, {
      nota1_r1: 4, nota2_r1: 4, nota3_r1: 4, // prom_r1 = 4
      nota1_r2: 4, nota2_r2: 4, nota3_r2: 4, // prom_r2 = 4
      nota1_r3: 4, nota2_r3: 4,              // nota3 = ?
      notaAprobacionCarrera: 4.0,
      // prom_r3_necesario = 4*3 - 4 - 4 = 4
      // nota3_necesaria = 4*3 - 4 - 4 = 4
    });
    app.calcular();
    expect(app.resultado?.notaNecesaria).toBe(4);
    expect(app.resultado?.yaReprobado).toBeFalse();
  });

  it('debe detectar que ya reprobó cuando la nota necesaria supera 7', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fillForm(app, {
      nota1_r1: 1, nota2_r1: 1, nota3_r1: 1, // prom_r1 = 1
      nota1_r2: 1, nota2_r2: 1, nota3_r2: 1, // prom_r2 = 1
      nota1_r3: 1, nota2_r3: 1,
      notaAprobacionCarrera: 4.0,
      // prom_r3_necesario = 12 - 1 - 1 = 10 → imposible
    });
    app.calcular();
    expect(app.resultado?.yaReprobado).toBeTrue();
    expect(app.resultado?.notaNecesaria).toBeGreaterThan(7);
  });

  it('debe limpiar el resultado al llamar limpiar()', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fillForm(app);
    app.calcular();
    expect(app.resultado).not.toBeNull();
    app.limpiar();
    expect(app.resultado).toBeNull();
    expect(app.form.get('nombre')?.value).toBeNull();
  });

  it('isInvalid debe retornar true si campo es inválido y tocado', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const campo = app.form.get('nombre')!;
    campo.markAsTouched();
    expect(app.isInvalid('nombre')).toBeTrue();
  });

  it('isInvalid debe retornar false si campo es válido', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.form.get('nombre')!.setValue('Juan');
    app.form.get('nombre')!.markAsTouched();
    expect(app.isInvalid('nombre')).toBeFalse();
  });

});
