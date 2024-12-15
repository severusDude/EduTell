<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class AttachmentController extends Controller
{
    public function store(Request $request)
    {
        // dd($request);
        // $request->validate([
        //     'attachments.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,pdf,doc,docx,xls,xlsx,ppt,pptx,txt|max:5120'
        // ]);
        // dd($request);

        // $attachments = [];

        // foreach ($request->attachments as $attachment) {
        //     if (is_string($attachment) && filter_var($attachment, FILTER_VALIDATE_URL)) {
        //         dd('here');
        //         $attachments[] = [
        //             Attachment::create([
        //                 'file_url' => $attachment
        //             ])
        //         ];
        //     } else if ($attachment instanceof UploadedFile) {
        //         dd('here');
        //         if ($attachment->isValid()) {
        //             $path = $attachment->store('attachments', 'public');

        //             $attachments[] = [
        //                 Attachment::crate([
        //                     'file_url' => $path
        //                 ])
        //             ];
        //         }
        //     }
        // }

        // return response()->json([
        //     'message' => 'Files has been uploaded succesfully',
        //     'data' => $attachments
        // ]);

        $request->validate([
            'attachments.*' => 'required|file|mimes:jpeg,png,jpg,gif,svg,pdf,doc,docx,xls,xlsx,ppt,pptx,txt|max:5120'
        ]);

        $files = $request->file('attachments');

        $uploaded_files = [];

        foreach ($files as $file) {
            if ($file->isValid()) {
                $path = $file->store('attachments', 'public');

                $attachment = Attachment::create([
                    'file_url' => $path
                ]);

                $uploaded_files[] = [
                    $attachment
                ];
            }
        }
        // $path = $request->file('attachments')->store('attachments', 'public');

        return response()->json([
            'message' => 'Files has been uploaded succesfully',
            'data' => $uploaded_files
        ]);
    }

    public function download(Attachment $attachment)
    {

        if (!Storage::disk('public')->exists($attachment->file_url)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return Storage::disk('public')->download($attachment->file_url);
    }

    public function destroy(Attachment $attachment)
    {
        if (!Storage::disk('public')->exists($attachment->file_url)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        Storage::delete($attachment->file_url);
        $attachment->delete();

        return response(null, 204);
    }
}
