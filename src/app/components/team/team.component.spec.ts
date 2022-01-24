import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamComponent } from './team.component';
import { gnome1, gnome2, gnomes } from '../../spec-helpers/gnome.spec-helper';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new Gnome', () => {
    component.gnomes = [gnome1]
    component.addNewGnome(gnome2);

    expect(component.gnomes).toEqual([gnome1, gnome2]);
  });

  it('should show alert if gnomes limit has been reached', () => {
    spyOn(window, "alert");
    component.gnomes = gnomes;
    component.addNewGnome(gnome2);

    expect(component.gnomes.length).toBe(4);
    expect(window.alert).toHaveBeenCalledWith("Limit of Gnomes for your team has been reached");
  });
});
