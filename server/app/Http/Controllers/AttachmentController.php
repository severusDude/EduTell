<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttachmentResource;
use App\Models\Attachment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class AttachmentController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:api'),
        ];
    }

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

        if ($request->hasFile('attachments')) {
            $files = $request->file('attachments');

            foreach ($files as $file) {
                if ($file->isValid()) {
                    $original_filename = $file->getClientOriginalName();
                    $file_name = pathinfo($original_filename, PATHINFO_FILENAME) . '.' . $file->extension();
                    $path = $file->store('attachments', 'public');

                    // Attachment::create([
                    //     'user_id' => $request->user()->id,
                    //     'file_name' => $file_name,
                    //     'file_url' => $path
                    // ]);

                    $request->user()->attachments()->create([
                        'user_id' => $request->user()->id,
                        'file_name' => $file_name,
                        'file_url' => $path
                    ]);
                }
            }
            // $path = $request->file('attachments')->store('attachments', 'public');

            return response()->json([
                'message' => 'Files has been uploaded succesfully',
                'data' => AttachmentResource::collection($request->user()->attachments)
            ]);
        }

        return response()->json(['error' => 'No files included'], 400);
    }

    public function serve(Attachment $attachment)
    {
        if (!Storage::disk('public')->exists($attachment->file_url)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return Storage::disk('public')->get($attachment->file_url);
        // return response()->download(Storage::disk('public')->path($attachment->file_url), $attachment->file_name);
    }

    public function download(Attachment $attachment)
    {

        if (!Storage::disk('public')->exists($attachment->file_url)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        // return Storage::disk('public')->download($attachment->file_url);
        return response()->download(Storage::disk('public')->path($attachment->file_url), $attachment->file_name);
    }

    public function destroy(Request $request, Attachment $attachment)
    {
        if (
            !(Storage::disk('public')->exists($attachment->file_url) ||
                preg_match('/(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/', $attachment->file_url)
            )
        ) {
            return response()->json(['error' => 'File not found'], 404);
        }

        if ($attachment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        Storage::delete($attachment->file_url);
        $attachment->delete();

        return response(null, 204);
    }
}
