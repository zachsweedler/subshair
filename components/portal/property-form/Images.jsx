"use client";
import Image from "next/image";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { ImageDropZone, ImageGrid, ImageWrapper, InputWrapper } from "./Styles";
import DeleteButton from "@/components/common/DeleteButton";
import { H4, Para } from "@/styles/StyledTypography";
import { updateProperty } from "@/slices/uploadSlice";
import { v4 as uuid } from 'uuid';
import { supabaseClient } from "@/utils/supabase";
import Notification from "@/components/common/Notification";

function Images({ dispatch, formRedux, user, formik }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const maxNumber = 10;
    const acceptedTypes = ["jpg", "jpeg", "png", "tif", "gif", "bmp", "webp"];

    async function handleNewPropertyRecord(id) {
      const { data, error } = await supabaseClient
          .from('properties')
          .insert({
              id,
              property_status: "Draft",
              created_by: user,
              created_at: new Date(),
          })
          .select();
  
      if (error) {
          throw error;
      }
      
      const { id: propertyId, property_status, created_by, created_at } = data[0];
      dispatch(updateProperty({
          id: propertyId,
          property_status: property_status,
          created_by: created_by,
          created_at: created_at
      }));
      return { id, property_status, created_by, created_at };
    }
  
    async function handleImageUpload(file, createdBy, id) {
        const { data, error } = await supabaseClient.storage
            .from('user-images')
            .upload(`${createdBy}/properties/${id}/${file.name}`, file, { upsert: true });
        if (error) {
            throw error;
        }
        return `user-images/${data.path}`; // Return just the path.
    }
    
    async function handleUpsertImagePath(paths, id) {
        const { data, error } = await supabaseClient
            .from('properties')
            .upsert({ id: id, property_images: paths })
            .select();
    
        if (error) {
            throw error;
        }
    
        return data;
    }
  
    const handleImageChange = async (imageList) => {
        try {
            setLoading(true);
            setError(null);
            setImages(imageList);
            formik.setFieldTouched("property_images", true, true);
            formik.setFieldValue("property_images", imageList, true);
    
            const imageFiles = imageList.map(image => image.file);
    
            let id = formRedux.id;
            let createdBy = formRedux.created_by;
    
            if (id == null) {
                const {id: propId, created_by} = await handleNewPropertyRecord(uuid());
                id = propId
                createdBy = created_by
            }
  
            const paths = await Promise.all(imageFiles.map(file => handleImageUpload(file, createdBy, id)));
            await handleUpsertImagePath(paths, id);
            dispatch(updateProperty({ property_images: paths }));
    
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ImageUploading
                multiple
                value={images}
                onChange={handleImageChange}
                maxNumber={maxNumber}
                acceptType={acceptedTypes}
                maxFileSize={30000000}
            >
                {({ onImageUpload, onImageRemove, isDragging, dragProps, errors }) => (
                    <ImageUploadUI
                        onImageUpload={onImageUpload}
                        onImageRemove={onImageRemove}
                        isDragging={isDragging}
                        dragProps={dragProps}
                        errors={errors}
                        loading={loading}
                        images={images}
                        formik={formik}
                        formRedux={formRedux}
                    />
                )}
            </ImageUploading>
            {error && <Notification error text={error.message} />}
        </>
    );
}

const ImageUploadUI = ({ onImageUpload, onImageRemove, isDragging, dragProps, errors, loading, formik, formRedux }) => (
    <>
        <H4>Property Images</H4>
        {loading ? <Para>Loading...</Para> :
            <>
                <ImageDropZone onClick={onImageUpload} {...dragProps}>
                    {isDragging ? <Para small grey>Now Drop!</Para> :
                        <div style={{ display: "inline-flex", gap: "3px" }}>
                            <Para small grey medium>Choose a file</Para>
                            <Para small grey>or drag it here</Para>
                        </div>}
                </ImageDropZone>
                <InputWrapper>
                    <ImageGrid>
                        {formRedux.property_images.map((image, index) => (
                            <ImageItem
                                key={index}
                                image={image}
                                onRemove={() => onImageRemove(index)}
                                loading={loading}
                            />
                        ))}
                    </ImageGrid>
                    <ErrorList errors={errors} formik={formik} />
                </InputWrapper>
            </>}
    </>
);

const ImageItem = ({ image, onRemove, loading }) => (
    <ImageWrapper>
        <Image alt="property_image" src={image} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover", opacity: loading ? "50%" : "100%" }} />
        <DeleteButton onClick={onRemove} disabled={loading} />
    </ImageWrapper>
);

const ErrorList = ({ errors, formik }) => (
    <div>
        {errors?.maxNumber && <Para small red>You can only upload up to 100 images.</Para>}
        {errors?.acceptType && <Para small red>Your selected file type is not allowed. Accepted types: {acceptedTypes.join(", ")}</Para>}
        {errors?.maxFileSize && <Para small red>Selected file size exceed maxFileSize of 30 MB.</Para>}
        {formik.touched.property_images && formik.errors.property_images && <Para red small>{formik.errors.property_images}</Para>}
    </div>
);

export default Images;