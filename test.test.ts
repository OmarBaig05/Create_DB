import { config } from 'dotenv';
config();

import { createData, readData, updateData, deleteData } from './CRUD';

jest.setTimeout(30000);

// Each collection ID is assumed to be in your .env file.
// Example: LAWYER_PROFILE_COLLECTION_ID=xxxxxx
// Adjust attribute values in the test objects as needed.

describe('LawyerProfile CRUD', () => {
  let documentId: string | null = null;

  it('should create a new LawyerProfile document', async () => {
    const data = {
      email: 'test@example.com',
      name: 'John Doe',
      phone: '1234567890',
      address: '123 Lawyer St.',
      city: 'Cityville',
      state: 'ST',
      zip: '12345',
      country: 'CountryX',
      practiceAreas: ['Criminal', 'Civil'],
      experience: '5 years',
      education: 'JD, Law School',
      profilePic: 'http://example.com/profile.jpg',
    };

    const res = await createData(process.env.NEXT_PUBLIC_LAWYERPROFILE_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the LawyerProfile document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_LAWYERPROFILE_ID as string, documentId!);
    expect(res.email).toBe('test@example.com');
  });

  it('should update the LawyerProfile document', async () => {
    expect(documentId).toBeTruthy();
    const newPhone = '9876543210';
    const res = await updateData(process.env.NEXT_PUBLIC_LAWYERPROFILE_ID as string, documentId!, {
      phone: newPhone,
    });
    expect(res.phone).toBe(newPhone);
  });

  it('should delete the LawyerProfile document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_LAWYERPROFILE_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});

describe('AssistantProfile CRUD', () => {
  let documentId: string | null = null;

  it('should create a new AssistantProfile document', async () => {
    const data = {
      userId: 'assistant_user_001',
      email: 'assistant@example.com',
      name: 'Assistant Name',
      phone: '5555555555',
      address: '123 Assistant Ave',
      city: 'HelperCity',
      state: 'HS',
      zip: '55555',
      country: 'AssistLand',
      profilePic: 'http://example.com/assistant.jpg',
    };
    const res = await createData(process.env.NEXT_PUBLIC_ASSISTANTPROFILE_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the AssistantProfile document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_ASSISTANTPROFILE_ID as string, documentId!);
    expect(res.email).toBe('assistant@example.com');
  });

  it('should update the AssistantProfile document', async () => {
    expect(documentId).toBeTruthy();
    const newName = 'Updated Assistant';
    const res = await updateData(
      process.env.NEXT_PUBLIC_ASSISTANTPROFILE_ID as string,
      documentId!,
      { name: newName }
    );
    expect(res.name).toBe(newName);
  });

  it('should delete the AssistantProfile document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(
      process.env.NEXT_PUBLIC_ASSISTANTPROFILE_ID as string,
      documentId!
    );
    expect(res).toBeTruthy();
  });
});

describe('Subscription CRUD', () => {
  let documentId: string | null = null;

  it('should create a new Subscription document', async () => {
    const data = {
      userId: 'userSub123',
      subscriptionId: 'sub987',
      subscriptionType: 'Premium',
      subscriptionAmount: 19.99,
      subscriptionDate: '2025-03-18',
      subscriptionExpiry: '2025-09-18',
      subscriptionStatus: 'active',
    };
    const res = await createData(process.env.NEXT_PUBLIC_SUBSCRIPTION_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the Subscription document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_SUBSCRIPTION_ID as string, documentId!);
    expect(res.subscriptionType).toBe('Premium');
  });

  it('should update the Subscription document', async () => {
    expect(documentId).toBeTruthy();
    const newStatus = 'expired';
    const res = await updateData(
      process.env.NEXT_PUBLIC_SUBSCRIPTION_ID as string,
      documentId!,
      { subscriptionStatus: newStatus }
    );
    expect(res.subscriptionStatus).toBe(newStatus);
  });

  it('should delete the Subscription document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_SUBSCRIPTION_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});

describe('Case CRUD', () => {
  let documentId: string | null = null;

  it('should create a new Case document', async () => {
    const data = {
      userId: 'user001',
      caseId: 'case001',
      caseType: 'Criminal',
      caseTitle: 'Case Title Test',
      caseDescription: 'Description of the test case',
      caseStatus: 'Open',
      caseDate: '2025-03-18',
      clientId: 'client123',
      lawyerId: 'lawyer123',
      chamberId: 'chamber123',
      assistantId: 'assistant123',
      hearingDate: '2025-04-10',
      hearingTime: '10:30',
      hearingVenue: 'Courtroom A',
    };
    const res = await createData(process.env.NEXT_PUBLIC_CASE_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the Case document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_CASE_ID as string, documentId!);
    expect(res.caseStatus).toBe('Open');
  });

  it('should update the Case document', async () => {
    expect(documentId).toBeTruthy();
    const newStatus = 'Closed';
    const res = await updateData(process.env.NEXT_PUBLIC_CASE_ID as string, documentId!, {
      caseStatus: newStatus,
    });
    expect(res.caseStatus).toBe(newStatus);
  });

  it('should delete the Case document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_CASE_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});

describe('Document CRUD', () => {
  let documentId: string | null = null;

  it('should create a new Document document', async () => {
    const data = {
      userId: 'userDoc123',
      documentId: 'docA1B2',
      documentName: 'LegalDoc.pdf',
      documentType: 'PDF',
      documentUrl: 'http://example.com/LegalDoc.pdf',
      documentDate: '2025-03-18',
      caseId: 'case123',
    };
    const res = await createData(process.env.NEXT_PUBLIC_DOCUMENT_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the Document document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_DOCUMENT_ID as string, documentId!);
    expect(res.documentName).toBe('LegalDoc.pdf');
  });

  it('should update the Document document', async () => {
    expect(documentId).toBeTruthy();
    const newName = 'UpdatedDocument.pdf';
    const res = await updateData(process.env.NEXT_PUBLIC_DOCUMENT_ID as string, documentId!, {
      documentName: newName,
    });
    expect(res.documentName).toBe(newName);
  });

  it('should delete the Document document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_DOCUMENT_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});

describe('Reminder CRUD', () => {
  let documentId: string | null = null;

  it('should create a new Reminder document', async () => {
    const data = {
      userId: 'user000',
      reminderId: 'reminder111',
      reminderTitle: 'Court Reminder',
      reminderDescription: 'Attend hearing on time',
      reminderDate: '2025-04-10',
      reminderTime: '09:00',
      reminderStatus: 'pending',
    };
    const res = await createData(process.env.NEXT_PUBLIC_REMINDER_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the Reminder document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_REMINDER_ID as string, documentId!);
    expect(res.reminderTitle).toBe('Court Reminder');
  });

  it('should update the Reminder document', async () => {
    expect(documentId).toBeTruthy();
    const newStatus = 'done';
    const res = await updateData(process.env.NEXT_PUBLIC_REMINDER_ID as string, documentId!, {
      reminderStatus: newStatus,
    });
    expect(res.reminderStatus).toBe(newStatus);
  });

  it('should delete the Reminder document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_REMINDER_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});

describe('Feedback CRUD', () => {
  let documentId: string | null = null;

  it('should create a new Feedback document', async () => {
    const data = {
      feedbackId: 'feed000',
      userId: 'userF001',
      caseId: 'case99',
      rating: 4.2,
      comment: 'Good service!',
      feedbackDate: '2025-03-18',
    };
    const res = await createData(process.env.NEXT_PUBLIC_FEEDBACK_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the Feedback document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_FEEDBACK_ID as string, documentId!);
    expect(res.comment).toBe('Good service!');
  });

  it('should update the Feedback document', async () => {
    expect(documentId).toBeTruthy();
    const newComment = 'Excellent service!';
    const res = await updateData(process.env.NEXT_PUBLIC_FEEDBACK_ID as string, documentId!, {
      comment: newComment,
    });
    expect(res.comment).toBe(newComment);
  });

  it('should delete the Feedback document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_FEEDBACK_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});

describe('Appointment CRUD', () => {
  let documentId: string | null = null;

  it('should create a new Appointment document', async () => {
    const data = {
      appointmentId: 'appt123',
      userId: 'userA',
      lawyerId: 'lawyer1',
      clientId: 'client1',
      appointmentDate: '2025-03-19',
      appointmentTime: '14:00',
      appointmentType: 'Consultation',
      appointmentStatus: 'scheduled',
      notes: 'Discuss case details',
    };
    const res = await createData(process.env.NEXT_PUBLIC_APPOINTMENT_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the Appointment document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_APPOINTMENT_ID as string, documentId!);
    expect(res.appointmentType).toBe('Consultation');
  });

  it('should update the Appointment document', async () => {
    expect(documentId).toBeTruthy();
    const newStatus = 'completed';
    const res = await updateData(process.env.NEXT_PUBLIC_APPOINTMENT_ID as string, documentId!, {
      appointmentStatus: newStatus,
    });
    expect(res.appointmentStatus).toBe(newStatus);
  });

  it('should delete the Appointment document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_APPOINTMENT_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});

describe('Announcements CRUD', () => {
  let documentId: string | null = null;

  it('should create a new Announcement document', async () => {
    const data = {
      announcementId: 'ann999',
      announcementTitle: 'Holiday Notice',
      announcementDescription: 'Office will be closed next Monday.',
      announcementDate: '2025-03-20',
      announcementTime: '08:00',
      announcementStatus: 'active',
      announcementMedia: 'http://example.com/announce.jpg',
    };
    const res = await createData(process.env.NEXT_PUBLIC_ANNOUNCEMENTS_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the Announcement document', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_ANNOUNCEMENTS_ID as string, documentId!);
    expect(res.announcementTitle).toBe('Holiday Notice');
  });

  it('should update the Announcement document', async () => {
    expect(documentId).toBeTruthy();
    const newStatus = 'inactive';
    const res = await updateData(
      process.env.NEXT_PUBLIC_ANNOUNCEMENTS_ID as string,
      documentId!,
      { announcementStatus: newStatus }
    );
    expect(res.announcementStatus).toBe(newStatus);
  });

  it('should delete the Announcement document', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_ANNOUNCEMENTS_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});

describe('DraftedDocuments CRUD', () => {
  let documentId: string | null = null;

  it('should create a new DraftedDocument', async () => {
    const data = {
      userId: 'userDraft123',
      clientId: 'clientDraft123',
      caseId: 'caseDraft123',
      documentId: 'docDraftABC',
      documentName: 'DraftDoc1',
      documentType: 'Word',
      documentUrl: 'http://example.com/draft.docx',
      documentDate: '2025-03-18',
    };
    const res = await createData(process.env.NEXT_PUBLIC_DRAFTEDDOCUMENTS_ID as string, data);
    documentId = res.$id;
    expect(res.$id).toBeDefined();
  });

  it('should read the DraftedDocument', async () => {
    expect(documentId).toBeTruthy();
    const res = await readData(process.env.NEXT_PUBLIC_DRAFTEDDOCUMENTS_ID as string, documentId!);
    expect(res.documentName).toBe('DraftDoc1');
  });

  it('should update the DraftedDocument', async () => {
    expect(documentId).toBeTruthy();
    const newName = 'UpdatedDraftDoc';
    const res = await updateData(
      process.env.NEXT_PUBLIC_DRAFTEDDOCUMENTS_ID as string,
      documentId!,
      { documentName: newName }
    );
    expect(res.documentName).toBe(newName);
  });

  it('should delete the DraftedDocument', async () => {
    expect(documentId).toBeTruthy();
    const res = await deleteData(process.env.NEXT_PUBLIC_DRAFTEDDOCUMENTS_ID as string, documentId!);
    expect(res).toBeTruthy();
  });
});