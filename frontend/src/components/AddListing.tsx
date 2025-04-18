import {
  Button,
  Group,
  NumberInput,
  TextInput,
  Textarea,
  Select,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useListingStore from "../store/listing";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImageBase64, setMainImageBase64] = useState<string | null>(null);
  const [mainImageError, setMainImageError] = useState<string | null>(null);

  const [otherImages, setOtherImages] = useState<(File | null)[]>([null, null, null, null]);
  const [otherImagesBase64, setOtherImagesBase64] = useState<(string | null)[]>([null, null, null, null]);
  const [otherImagesError, setOtherImagesError] = useState<string | null>(null);

  const { addListing, submitionState } = useListingStore();
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      country: "",
      address: "",
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Title is required"),
      description: (value) => (value.trim().length > 0 ? null : "Description is required"),
      category: (value) => (value.trim().length > 0 ? null : "Category is required"),
      price: (value) => (value > 0 ? null : "Price must be greater than 0"),
      country: (value) => (value.trim().length > 0 ? null : "Country is required"),
      address: (value) => (value.trim().length > 0 ? null : "Address is required"),
      bedrooms: (value) => (value > 0 ? null : "At least 1 bedroom"),
      beds: (value) => (value > 0 ? null : "At least 1 bed"),
      bathrooms: (value) => (value > 0 ? null : "At least 1 bathroom"),
    },
  });

  // const convertToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  
  //     reader.onloadend = () => {
  //       if (typeof reader.result === "string") {
  //         resolve(reader.result);
  //       } else {
  //         reject("Failed to convert file to base64.");
  //       }
  //     };
  
  //     reader.onerror = () => {
  //       reject("Error reading file.");
  //     };
  
  //     reader.readAsDataURL(file);
  //   });
  // };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject("Error converting file to base64");
  
      reader.readAsDataURL(file);
    });
  };
  

  // const convertToBase64 = (file: File, callback: (base64: string) => void) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     callback(reader.result as string);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleMainImageChange = async (file: File | null) => {
    setMainImage(file);
    setMainImageError(null);
    if (!file) {
      setMainImageBase64(null);
      return;
    }
    const getBase64 = convertToBase64(file);
    if (getBase64) {
      const base64 = await getBase64;
      setMainImageBase64(base64);
    }
  };

  const handleOtherImageChange = async (file: File | null, index: number) => {
    const updatedFiles = [...otherImages];
    const updatedBase64 = [...otherImagesBase64];

    updatedFiles[index] = file;
    
    if(file) {
      const getBase64 = convertToBase64(file);

      if (getBase64) {
        const base64 = await getBase64;
        updatedBase64[index] = base64;
        setOtherImagesBase64(updatedBase64);
      }
    }else {
      updatedBase64[index] = null;
    }

    setOtherImages(updatedFiles);

  };


  const handleSubmit = async (values: typeof form.values) => {
    let hasError = false;

    if (!mainImage || !mainImageBase64) {
      setMainImageError("Main image is required");
      hasError = true;
    }

    const validOtherImages = otherImagesBase64.filter((img) => img !== null);
    if (validOtherImages.length < 4) {
      setOtherImagesError("Add all 4 images");
      hasError = true;
    }

    if (hasError) return;

    const formData = {
      ...values,
      image: mainImageBase64,
      images: validOtherImages.map((url) => ({ url })),
    };

    await addListing(formData);
    navigate("/dashboard");
  };

  return (
    <div className="px-5 md:px-10 bg-gray-100 mt-5 flex items-center justify-center">
      <form className="w-full md:w-[700px]" onSubmit={form.onSubmit(handleSubmit)}>
        <h1 className="font-bold text-3xl py-4">Create a Listing</h1>

        <TextInput label="Title" placeholder="Enter the title" withAsterisk {...form.getInputProps("title")} />
        <Textarea label="Description" placeholder="Enter the description" withAsterisk {...form.getInputProps("description")} />
        <Select label="Category" placeholder="Select category" data={["Beach", "Cabin", "Apartment", "Luxury"]} withAsterisk {...form.getInputProps("category")} />
        <NumberInput label="Price per night" placeholder="Enter price" withAsterisk {...form.getInputProps("price")} />

        <div className="grid grid-cols-2 gap-2">
          <TextInput label="Country" placeholder="Country" withAsterisk {...form.getInputProps("country")} />
          <TextInput label="Address" placeholder="Address" withAsterisk {...form.getInputProps("address")} />
        </div>

        <FileInput label="Main Image" placeholder="Upload main image" withAsterisk value={mainImage} onChange={handleMainImageChange} error={mainImageError} />

        {mainImageBase64 && (
          <div className="mt-2 flex flex-col items-center">
            <p className="text-sm text-gray-600 mb-1">Main Image Preview:</p>
            <img src={mainImageBase64} alt="Main Preview" className="rounded-md border max-h-48" />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {otherImages.map((file, index) => (
            <div key={index}>
              <FileInput
                label={`Image ${index + 1}`}
                placeholder={`Upload image ${index + 1}`}
                value={file}
                onChange={(f) => handleOtherImageChange(f, index)}
              />
              {otherImagesBase64[index] && (
                <img
                  src={otherImagesBase64[index] as string}
                  alt={`Preview ${index + 1}`}
                  className="rounded-md border max-h-28 mt-2 mx-auto"
                />
              )}
            </div>
          ))}
        </div>

        {otherImagesError && (
          <p className="text-red-500 text-sm mt-1 col-span-full">{otherImagesError}</p>
        )}

        <div className="grid grid-cols-3 gap-2 mt-4">
          <NumberInput label="Bedrooms" placeholder="No. of bedrooms" withAsterisk {...form.getInputProps("bedrooms")} />
          <NumberInput label="Beds" placeholder="No. of beds" withAsterisk {...form.getInputProps("beds")} />
          <NumberInput label="Bathrooms" placeholder="No. of bathrooms" withAsterisk {...form.getInputProps("bathrooms")} />
        </div>

        <Group justify="flex-end" mt="md">
          <Button disabled={!!submitionState} type="submit">
            Add Listing
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default AddListing;
