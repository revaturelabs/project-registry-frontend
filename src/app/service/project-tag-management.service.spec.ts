import { TestBed } from '@angular/core/testing';

import { ProjectTagManagementService } from './project-tag-management.service';

describe('ProjectTagManagementService', () => {
  let service: ProjectTagManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectTagManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
