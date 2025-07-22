import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHorizontalComponent } from './item-horizontal.component';

describe('ItemHorizontalComponent', () => {
  let component: ItemHorizontalComponent;
  let fixture: ComponentFixture<ItemHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
