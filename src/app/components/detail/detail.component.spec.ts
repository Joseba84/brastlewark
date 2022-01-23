import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { gnome1 } from '../../spec-helpers/gnome.spec-helper';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let compiled;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailComponent ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    component.gnome = gnome1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as name', () => {
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('img').src).toContain(gnome1.thumbnail);
  });

  it('should have as age', () => {
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('p.age').textContent).toContain(gnome1.age);
  });

  it('should have as weight', () => {
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('p.weight').textContent).toContain(gnome1.weight);
  });

  it('should have as hair', () => {
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('p.hair').textContent).toContain(gnome1.hair_color);
  });

  it('should have as professions', () => {
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('p.professions').textContent).toContain("Professions");
  });

  it('should have as friends', () => {
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('p.friends').textContent).toContain("Friends");
  });
});
