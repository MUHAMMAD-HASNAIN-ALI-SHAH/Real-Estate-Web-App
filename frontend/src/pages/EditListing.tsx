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
import { useEffect, useState } from "react";
import useListingStore from "../store/listing";
import { useNavigate, useParams } from "react-router-dom";

const EditListing = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const [otherImages, setOtherImages] = useState<(File | null)[]>([null, null, null, null]);
  const [otherImagesBase64, setOtherImagesBase64] = useState<(string | null)[]>([null, null, null, null]);
  const [otherImagesError, setOtherImagesError] = useState<string | null>(null);

  const { editListing, submitionState, getSingleListing } = useListingStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
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
      description: (value) =>
        value.trim().length > 0 ? null : "Description is required",
      category: (value) =>
        value.trim().length > 0 ? null : "Category is required",
      price: (value) => (value > 0 ? null : "Price must be greater than 0"),
      country: (value) =>
        value.trim().length > 0 ? null : "Country is required",
      address: (value) =>
        value.trim().length > 0 ? null : "Address is required",
      bedrooms: (value) => (value > 0 ? null : "Must have at least 1 bedroom"),
      beds: (value) => (value > 0 ? null : "Must have at least 1 bed"),
      bathrooms: (value) =>
        value > 0 ? null : "Must have at least 1 bathroom",
    },
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject("Error converting file to base64");
  
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (file: File | null) => {
    setImage(file);
    setImageError(null);

    if (!file) {
      setImageBase64(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOtherImageChange = async (file:File | null, index: number) => {
    const updatedFiles = [...otherImages];
    const updatedBase64 = [...otherImagesBase64];

    updatedFiles[index] = file;
    if(file) {
      const getBase64 = convertToBase64(file);
      if (getBase64) {
        const base64 = await getBase64;
        updatedBase64[index] = base64;
      }
    }
    setOtherImages(updatedFiles);
    setOtherImagesBase64(updatedBase64);
  }

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(() => {
    const getListingData = async () => {
      const listingData = await getSingleListing(id as string);
      console.log(listingData);
      if (listingData) {
        form.setValues({
          title: listingData.title,
          description: listingData.description,
          category: listingData.category,
          price: listingData.price,
          country: listingData.country,
          address: listingData.address,
          bedrooms: listingData.bedrooms,
          beds: listingData.beds,
          bathrooms: listingData.bathrooms,
        });
        setImageBase64(listingData.image);
        setOtherImagesBase64([
          listingData.image1,
          listingData.image2,
          listingData.image3,
          listingData.image4,
        ]);
      }
    };
    getListingData();
  }, [getSingleListing]);

  const handleSubmit = async (values: typeof form.values) => {
    let hasError = false;
    if (!image && !imageBase64) {
      setImageError("Main image is required");
      hasError = true;
    }

    setImageError(null);

    const validOtherImages = otherImagesBase64.filter((img)=>img!== null);
    if(validOtherImages.length < 4) {
      setOtherImagesError("Add all 4 images");
      hasError = true;
    }

    if (hasError) return;

    const formData = {
      _id: id,
      ...values,
      image: imageBase64,
      image1: validOtherImages[0],
      image2: validOtherImages[1],
      image3: validOtherImages[2],
      image4: validOtherImages[3],
    };

    await editListing(formData);
    navigate("/dashboard");
  };

  return (
    <div className="px-5 md:px-10 bg-gray-100 mt-5 flex items-center justify-center">
      <form
        className="w-full md:w-[700px]"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <h1 className="font-bold text-3xl py-4">Edit your Listing</h1>

        <TextInput
          label="Title"
          placeholder="Enter the title of your listing"
          withAsterisk
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Description"
          placeholder="Provide a detailed description"
          withAsterisk
          {...form.getInputProps("description")}
        />

        <Select
          label="Category"
          placeholder="Select a category"
          data={["Beach", "Cabin", "Apartment", "Luxury"]}
          withAsterisk
          {...form.getInputProps("category")}
        />

        <NumberInput
          label="Price per night"
          placeholder="Enter the price"
          withAsterisk
          {...form.getInputProps("price")}
        />

        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Country"
            placeholder="Enter country"
            withAsterisk
            {...form.getInputProps("country")}
          />
          <TextInput
            label="Address"
            placeholder="Enter address"
            withAsterisk
            {...form.getInputProps("address")}
          />
        </div>

        <FileInput
          label="Main Image"
          placeholder="Upload main image"
          withAsterisk
          value={image}
          onChange={handleImageChange}
          error={imageError}
        />

        {imageBase64 && (
          <div className="mt-2 flex flex-col items-center">
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img
              src={imageBase64}
              alt="Preview"
              className="rounded-md border max-h-48"
            />
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
          <NumberInput
            label="Bedrooms"
            placeholder="No. of bedrooms"
            withAsterisk
            {...form.getInputProps("bedrooms")}
          />
          <NumberInput
            label="Beds"
            placeholder="No. of beds"
            withAsterisk
            {...form.getInputProps("beds")}
          />
          <NumberInput
            label="Bathrooms"
            placeholder="No. of bathrooms"
            withAsterisk
            {...form.getInputProps("bathrooms")}
          />
        </div>

        <Group justify="flex-end" mt="md">
          <Button disabled={!!submitionState} type="submit">
            Edit Listing
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default EditListing;
