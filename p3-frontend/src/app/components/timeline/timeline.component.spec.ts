import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show a week after the furthest batch's p3", () => {
    expect(component.timelineUpperBound?.getMilliseconds()).toBeGreaterThanOrEqual(new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).getMilliseconds());
    // expect(component.calculateUpperBound().getMilliseconds()).toBeGreaterThanOrEqual(new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).getMilliseconds());
  });

  it('should show the batches that end earlier above the batches that end later', () => {
		 expect(component.initializeBatchArray()).toBe(undefined);
	}); //a sort 

	it('should', fakeAsync(() => {
    spyOn(component, 'showBatchDetails');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.showBatchDetails).toHaveBeenCalled();
	
    }));
});
