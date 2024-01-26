import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PGPGComponent } from './pgpg.component';

describe('PGPGComponent', () => {
  let component: PGPGComponent;
  let fixture: ComponentFixture<PGPGComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PGPGComponent]
    });
    fixture = TestBed.createComponent(PGPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
