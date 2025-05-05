
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Event {
  name: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  registrations: number;
  status: string;
}

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
}

const AddEventDialog = ({ isOpen, onClose, onAddEvent }: AddEventDialogProps) => {
  const [formData, setFormData] = useState<Event>({
    name: '',
    date: '',
    venue: '',
    description: '',
    imageUrl: '/placeholder.svg',
    registrations: 0,
    status: 'Upcoming',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'registrations' ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // In a real app, this would upload to a server
      // For demo, we'll use a local URL
      const imageUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImagePreview(imageUrl);
      
      // Update form data with the new image URL
      // In a real app, this would be the URL from the server
      setFormData(prev => ({
        ...prev,
        imageUrl: imageUrl
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.date || !formData.venue) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // In a real app, we would upload the image to a server here
    // and get back a URL to store in the database
    
    onAddEvent(formData);
    
    // Reset form
    setFormData({
      name: '',
      date: '',
      venue: '',
      description: '',
      imageUrl: '/placeholder.svg',
      registrations: 0,
      status: 'Upcoming',
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-festblue-light text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Event</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Event Name*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-festblue border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
              Event Date*
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-festblue border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
            />
          </div>
          
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-300 mb-1">
              Venue*
            </label>
            <input
              id="venue"
              name="venue"
              type="text"
              required
              value={formData.venue}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-festblue border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-festblue border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
            />
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
              Event Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-festblue border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
            />
            {imagePreview && (
              <div className="mt-2 relative w-full h-32">
                <img 
                  src={imagePreview} 
                  alt="Event preview" 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="registrations" className="block text-sm font-medium text-gray-300 mb-1">
              Initial Registrations
            </label>
            <input
              id="registrations"
              name="registrations"
              type="number"
              min="0"
              value={formData.registrations}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-festblue border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-festblue border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-festblue-accent hover:bg-festblue-accent/80">
              Add Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
